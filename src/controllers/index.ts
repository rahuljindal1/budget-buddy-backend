import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { AuthController } from './Auth';

@Module({
  imports: [RepositoriesModule],
  controllers: [AuthController],
})
export class ControllersModule {}
