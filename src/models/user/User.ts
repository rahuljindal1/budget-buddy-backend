import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoleEnum } from 'src/enums';
import { BaseModel } from '../BaseModel';

export class UserModel extends BaseModel<UserModel> {
  @IsString()
  readonly id: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

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
