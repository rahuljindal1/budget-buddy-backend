import { CreateUserModelDto, UserModel } from 'src/models';
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

  public async getByEmail(email: string): Promise<UserModel | undefined> {
    const user = await this.model.findOne({ email }).lean();
    if (user) {
      return new UserModel({ ...user, id: user._id } as unknown as UserModel);
    }
  }

  public async create(payload: CreateUserModelDto): Promise<UserModel> {
    const user = new this.model(payload);
    const response = await user.save();
    return new UserModel(response as unknown as UserModel);
  }
}
