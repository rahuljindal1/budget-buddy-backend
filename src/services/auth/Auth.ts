import {
  CreateUserModelDto,
  LoginRequestModel,
  SignUpRequestModel,
  UserModel,
  UserResponseModel,
} from 'src/models';
import { IAuthService } from './IAuth';
import { BadRequestException, ConflictException, Inject } from '@nestjs/common';
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

  public async login(request: LoginRequestModel): Promise<UserResponseModel> {
    const dbUser = await this.userRepository.getByEmail(request.email);

    if (!dbUser) {
      throw new BadRequestException('Email/Password is not correct.');
    }

    const isSamePassword = UserModel.comparePassword(
      request.password,
      dbUser.password,
    );
    if (!isSamePassword) {
      throw new BadRequestException('Email/Password is not correct.');
    }

    return new UserResponseModel(dbUser);
  }
}
