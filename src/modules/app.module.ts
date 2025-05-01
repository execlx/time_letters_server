import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from '../config/config.module';
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './auth/email/email.module';
import { LoggerModule } from './logger/logger.module';
import { DeepseekModule } from './deepseek/deepseek.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    EmailModule,
    LoggerModule,
    DeepseekModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
