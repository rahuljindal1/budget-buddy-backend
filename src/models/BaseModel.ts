type Mutable<T> = { -readonly [key in keyof T]: T[key] };

export abstract class BaseModel<T> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(plain: Mutable<T>) {}
}
