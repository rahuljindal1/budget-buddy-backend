import { Module } from '@nestjs/common';
import { AuthController } from './Auth';
import { ServicesModule } from 'src/services';

@Module({
  imports: [ServicesModule],
  controllers: [AuthController],
})
export class ControllersModule {}
