import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { 
  SendEmailCodeDto, 
  VerifyEmailCodeDto, 
  SendEmailCodeResponseDto, 
  VerifyEmailCodeResponseDto 
} from './dto/email-dto';
import { BusinessException } from '../../../common/exceptions/business.exception';
import { ErrorCode } from '../../../common/constants/errorcode.constant';
import { IsEmail } from 'class-validator';

class SendVerificationCodeDto {
    @IsEmail()
    email: string;
}

class VerifyCodeDto {
    @IsEmail()
    email: string;

    code: string;
}

@ApiTags('邮箱验证码')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiOperation({ summary: '验证邮箱验证码' })
  @ApiResponse({ status: 200, description: '验证成功', type: VerifyEmailCodeResponseDto })
  @ApiResponse({ status: 400, description: '验证失败' })
  @ApiBody({ type: VerifyEmailCodeDto })
  @Post('verify')
  async verifyCode(@Body() verifyCodeDto: VerifyEmailCodeDto) {
    try {
      const isValid = await this.emailService.validateVerificationCode(
        verifyCodeDto.email,
        verifyCodeDto.code,
      );
      return { isValid };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('验证码验证失败', ErrorCode.INVALID_EMAIL_VERIFICATION_CODE);
    }
  }

  @Post('send-code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '发送邮箱验证码' })
  @ApiResponse({ status: 200, description: '发送成功', type: SendEmailCodeResponseDto })
  @ApiResponse({ status: 400, description: '发送失败' })
  @ApiBody({ type: SendEmailCodeDto })
  async sendVerificationCode(@Body() dto: SendVerificationCodeDto): Promise<void> {
    await this.emailService.createVerificationCode(dto.email);
  }
} 