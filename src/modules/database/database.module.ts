import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../../interfaces/config.interface';
import { AppConfigModule } from '../../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],  // 引入 ConfigModule
      useFactory: async (config: DatabaseConfig) => ({
        type: 'mysql',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: ['DATABASE_CONFIG'],  // 注入 DATABASE_CONFIG
    }),
  ],
})
export class DatabaseModule {}
