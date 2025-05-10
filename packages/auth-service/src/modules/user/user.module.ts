import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { PhoneService } from '../auth/phone/phone.service';
import { EmailService } from '../auth/email/email.service';
import { PhoneModule } from '../auth/phone/phone.module';
import { EmailModule } from '../auth/email/email.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PhoneModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
