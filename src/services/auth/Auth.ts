import { SignUpRequestModel } from 'src/models';
import { IAuthService } from './IAuth';

export class AuthService implements IAuthService {
  public async signUp(request: SignUpRequestModel): Promise<void> {
    console.log(request);
    throw new Error('Method not implemeted');
  }
}
