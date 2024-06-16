import { CreateUserModelDto, SignUpRequestModel, UserModel } from 'src/models';
import { IAuthService } from './IAuth';
import { ConflictException, Inject } from '@nestjs/common';
import { IUserRepository } from 'src/repositories/mongo';
import { UserRoleEnum } from 'src/enums';

export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  public async signUp(request: SignUpRequestModel): Promise<UserModel> {
    const dbUser = await this.userRepository.getByEmail(request.email);
    if (dbUser) {
      throw new ConflictException(
        'Account already exist with the same email. Please try another one',
      );
    }
    return await this.userRepository.create(
      new CreateUserModelDto({
        ...request,
        password: await UserModel.hashPassword(request.password),
        isDeleted: false,
        userRole: UserRoleEnum.USER,
      }),
    );
  }
}
