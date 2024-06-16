import { SignUpRequestModel } from 'src/models';

export type IAuthService = {
  signUp(request: SignUpRequestModel): Promise<void>;
};

export const IAuthService = Symbol('IAuthService');
