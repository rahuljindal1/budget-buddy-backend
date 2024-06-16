import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeaturesModule } from './modules';
@Module({
  imports: [FeaturesModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
