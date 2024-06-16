import { CreateUserModelDto, UserModel } from 'src/models';

export type IUserRepository = {
  getByEmail(email: string): Promise<UserModel | undefined>;
  create(payload: CreateUserModelDto): Promise<UserModel>;
};

export const IUserRepository = Symbol('IUserRepository');
