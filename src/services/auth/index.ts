import { Provider } from '@nestjs/common';
import { IAuthService } from './IAuth';
import { AuthService } from './Auth';

const AuthProvider: Provider = {
  provide: IAuthService,
  useClass: AuthService,
};
export { IAuthService, AuthProvider };
