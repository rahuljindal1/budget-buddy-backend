import { IsString } from 'class-validator';
import { BaseModel } from '../BaseModel';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequestModel extends BaseModel<SignUpRequestModel> {
  @IsString()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}
