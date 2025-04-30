import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { PhoneVerification } from './entities/phone-verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneVerification])],
  controllers: [PhoneController],
  providers: [PhoneService],
  exports: [PhoneService],
})
export class PhoneModule {} 