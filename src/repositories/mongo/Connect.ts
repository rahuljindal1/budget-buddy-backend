import { Provider } from '@nestjs/common';
import { Schema, Connection, Model } from 'mongoose';
import { MongoProvider } from './Mongo';

export class MongooseConnection<T> {
  protected static readonly providerSymbol: symbol;
  protected static readonly modelName: string;
  protected static readonly modelSchema: Schema;
  public static async factory<M>(connection: Connection) {
    const model = connection.model<M>(this.modelName, this.modelSchema);
    return new this(model);
  }
  public static provider(): Provider {
    return {
      provide: this.providerSymbol,
      useFactory: async (mongoProvider: MongoProvider) =>
        await this.factory(mongoProvider.getConnection()),
      inject: [MongoProvider],
    };
  }
  constructor(protected readonly model: Model<T>) {}
}
