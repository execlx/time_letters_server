import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeepseekService } from './deepseek.service.js';
import { DeepseekController } from './deepseek.controller.js';

@Module({
  imports: [ConfigModule],
  controllers: [DeepseekController],
  providers: [DeepseekService],
  exports: [DeepseekService],
})
export class DeepseekModule {} 