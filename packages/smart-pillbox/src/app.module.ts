import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicinesModule } from './medicines/medicines.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({
      baseURL: process.env.AUTH_SERVICE_URL || 'http://localhost:3000',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'yaofang',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: false,
    }),
    MedicinesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} 