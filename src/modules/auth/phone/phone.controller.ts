import { Controller, Post, Body } from '@nestjs/common';
import { PhoneService } from './phone.service';

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post('verify')
  async verifyCode(@Body() body: { phone: string; code: string }) {
    const isValid = await this.phoneService.validateVerificationCode(
      body.phone,
      body.code,
    );
    return { isValid };
  }

  @Post('send-code')
  async sendVerificationCode(@Body() body: { phone: string }) {
    const code = await this.phoneService.createVerificationCode(body.phone);
    // TODO: Implement actual SMS sending
    return { success: true };
  }
} 