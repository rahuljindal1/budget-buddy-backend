import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoleEnum } from 'src/enums';
import { BaseModel } from '../BaseModel';
import * as bcrypt from 'bcrypt';

export abstract class User<T> extends BaseModel<T> {
  @IsString()
  readonly id: string;

  @IsString()
  readonly email: string;

  @IsEnum(UserRoleEnum)
  readonly userRole: UserRoleEnum;

  @IsBoolean()
  @IsOptional()
  readonly isDeleted?: boolean;

  @IsDate()
  readonly createdAt: Date;

  @IsDate()
  readonly updatedAt: Date;
}

export class UserModel extends User<UserModel> {
  @IsString()
  readonly password: string;

  public static async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  public static async comparePassword(
    password: string,
    hashedPassword: string,
  ) {
    return bcrypt.compare(password, hashedPassword);
  }
}

export class CreateUserModelDto extends BaseModel<CreateUserModelDto> {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsEnum(UserRoleEnum)
  readonly userRole: UserRoleEnum;

  @IsBoolean()
  readonly isDeleted: boolean;
}
