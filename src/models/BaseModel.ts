import { NotImplementedException, Type } from '@nestjs/common';
import { getMetadataStorage } from 'class-validator';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';

type Mutable<T> = { -readonly [key in keyof T]: T[key] };

const reflectArrayField = (meta: ValidationMetadata): Type | undefined => {
  let propType: Type;
  const propName = meta.propertyName;
  if (['isInstance', 'isInterface', 'isEnum'].includes(meta.name)) {
    propType = meta.constraints[0];
  } else if (
    ['isString', 'isNumber', 'isBoolean', 'isObject'].includes(meta.name)
  ) {
    // For primitive data type, Return undefined
    return;
  } else {
    throw new NotImplementedException(
      `Unrecognised constraint ${meta.name} encountered for ${propName}`,
    );
  }
  return propType;
};

export abstract class BaseModel<T> {
  readonly #modelValidationFields =
    getMetadataStorage().getTargetValidationMetadatas(
      this.constructor,
      '',
      false,
      false,
      [],
    );
  readonly #arrayFields = this.#modelValidationFields
    .filter((f) => f.each === true)
    .map(reflectArrayField);
  readonly #enumMaps = Object.fromEntries(
    this.#modelValidationFields
      .filter((f) => f.name === 'isEnum')
      .map((meta) => [meta.propertyName, meta.constraints[0]]),
  );
  readonly #registeredFields = new Set(
    this.#modelValidationFields.map((metadata) => metadata.propertyName),
  );

  constructor(plain: Mutable<T>) {
    if (plain === undefined) {
      Object.freeze({});
      return;
    }
    for (const propertyName of this.#registeredFields) {
      const plainField = plain[propertyName];
      if (plainField !== undefined && plainField !== null) {
        this[propertyName] = this.setPropertyValue(propertyName, plainField);
      }
      Object.freeze(this[propertyName]);
    }
    Object.freeze(this);
  }

  private setPropertyValue(propertyName: string, plainField: Mutable<T>): T {
    const prop = Reflect.getMetadata('design:type', this, propertyName);
    if (prop.prototype instanceof BaseModel && !(plainField instanceof prop)) {
      return new prop(plainField);
    } else if (prop === Date) {
      return new prop(plainField);
    } else if (prop === Array) {
      const propType = this.#arrayFields[propertyName];

      // @ts-expect-error Field can be array as well
      return plainField.map((arrayItem) => {
        if (!propType) {
          return arrayItem;
        }
        return arrayItem instanceof propType
          ? arrayItem
          : new propType(arrayItem);
      });
    } else if (this.isEnum(propertyName)) {
      return this.toEnumString(plainField, propertyName) as T;
    } else {
      return plainField;
    }
  }

  private isEnum(propertyName: string): boolean {
    return propertyName in this.#enumMaps;
  }

  private toEnumString(value: T, propertyName: string): string {
    if (this.isString(value)) {
      return value as string;
    } else if (Number.isInteger(value)) {
      const enumMaps = this.#enumMaps;
      return enumMaps[propertyName][value];
    } else if (this.isObject(value)) {
      return value.toString();
    } else {
      throw new NotImplementedException(
        `Unrecognised value ${value} found in enum ${propertyName}`,
      );
    }
  }

  private isString(x: T): boolean {
    return Object.prototype.toString.call(x) === '[object String]';
  }

  private isObject(x: T): boolean {
    return Object.prototype.toString.call(x) === '[object Object]';
  }
}
