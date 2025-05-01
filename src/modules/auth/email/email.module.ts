import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { EmailVerification } from './entities/email-verification.entity';
import { RedisModule } from '../../redis/redis.module';
import { LoggerModule } from '../../logger/logger.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmailVerification]),
        ConfigModule,
        RedisModule,
        LoggerModule,
    ],
    controllers: [EmailController],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {} 