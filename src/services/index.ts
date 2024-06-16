import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories';
import { AuthProvider, IAuthService } from './auth';

@Module({
  imports: [RepositoriesModule],
  providers: [AuthProvider],
  exports: [IAuthService],
})
export class ServicesModule {}
