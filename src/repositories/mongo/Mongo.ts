import { OnModuleDestroy, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose, { Connection, Mongoose } from 'mongoose';

export class MongoProvider implements OnModuleDestroy {
  constructor(private readonly mongo: Mongoose) {}

  public static provider(): Provider {
    return {
      provide: MongoProvider,
      useFactory: async (configService: ConfigService) => {
        return new this(
          await mongoose.connect(
            configService.getOrThrow('DB_CONNECTION_STRING'),
          ),
        );
      },
      inject: [ConfigService],
    };
  }

  public async onModuleDestroy(): Promise<void> {
    await this.mongo.disconnect();
  }

  public getConnection(): Connection {
    return this.mongo.connection;
  }
}
