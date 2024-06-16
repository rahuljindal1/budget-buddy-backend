import { SignUpRequestModel, UserModel } from 'src/models';

export type IAuthService = {
  signUp(request: SignUpRequestModel): Promise<UserModel>;
};

export const IAuthService = Symbol('IAuthService');
