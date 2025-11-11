import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

const mongooseLogger = new Logger('Mongoose');
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        const dbName = configService.get<string>('MONGO_DB_NAME') || 'wallet_service';
        return {
          uri,
          dbName,
          connectionFactory: async (connection) => {
            // connection.set('debug', true);

            try {
              await connection.db.admin().ping();
              mongooseLogger.log('📡 MongoDB ping successful');
            } catch (err) {
              mongooseLogger.error('❌ MongoDB ping failed:', err);
            }

            return connection;
          },
        };
      },
    }),
  ],
})
export class MongoContext {}
