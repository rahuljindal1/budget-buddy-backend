import { IsString } from 'class-validator';
import { BaseModel } from '../BaseModel';

export class SignUpRequestModel extends BaseModel<SignUpRequestModel> {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
