export type IUserRepository = {
  signUp(): Promise<void>;
};

export const IUserRepository = Symbol('IUserRepository');
