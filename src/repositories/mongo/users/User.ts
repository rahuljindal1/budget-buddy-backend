import { MongooseConnection } from '../Connect';
import { IUserRepository } from './Interface';
import { UserSchema } from './schema';

export class UserRepository
  extends MongooseConnection<IUserRepository>
  implements IUserRepository
{
  protected static readonly providerSymbol = IUserRepository;
  protected static readonly modelName = 'users';
  protected static readonly modelSchema = UserSchema;

  signUp(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
