import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllersModule } from './controllers';
@Module({
  imports: [ControllersModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
