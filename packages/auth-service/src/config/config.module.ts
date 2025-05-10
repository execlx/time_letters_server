// config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { AppConfig, DatabaseConfig, JwtConfig } from 'src/interfaces/config.interface';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // 配置全局可用
    }),
  ],
  providers: [{
    provide: 'CONFIG_OPTIONS',
    useFactory: (config: AppConfig) => {
      return configuration();
    },
    inject: [ConfigService],
  }, {
    
    provide: 'JWT_CONFIG',
    useFactory: (config: AppConfig): JwtConfig => {
      return {
        secret: config.jwt.secret,
        expiresIn: config.jwt.expiresIn,
      };
    },
    inject: ['CONFIG_OPTIONS'],
  },
  {
    provide: 'DATABASE_CONFIG',
    useFactory: (config: AppConfig): DatabaseConfig => {
      return {
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
      };
    },
  inject: ['CONFIG_OPTIONS'],
  },
],
exports: ['JWT_CONFIG', 'DATABASE_CONFIG']})
export class AppConfigModule {}
