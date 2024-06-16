import { Module } from '@nestjs/common';
import { IUserRepository, MongoProvider, UserRepository } from './mongo';

@Module({
  providers: [MongoProvider.provider(), UserRepository.provider()],
  exports: [IUserRepository],
})
export class RepositoriesModule {}
