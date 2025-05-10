import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.AUTH_SERVICE_URL || 'http://localhost:3000',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} 