import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { EmailVerification } from './entities/email-verification.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmailVerification]),
        ConfigModule,
    ],
    controllers: [EmailController],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {} 