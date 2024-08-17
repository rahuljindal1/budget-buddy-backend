import {
  LoginRequestModel,
  SignUpRequestModel,
  UserModel,
  UserResponseModel,
} from 'src/models';

export type IAuthService = {
  signUp(request: SignUpRequestModel): Promise<UserModel>;
  login(request: LoginRequestModel): Promise<UserResponseModel>;
};

export const IAuthService = Symbol('IAuthService');
