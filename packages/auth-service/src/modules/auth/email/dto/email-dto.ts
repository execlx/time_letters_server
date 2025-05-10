import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailCodeDto {
  @ApiProperty({ description: '邮箱地址' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;
}

export class VerifyEmailCodeDto {
  @ApiProperty({ description: '邮箱地址' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @ApiProperty({ description: '验证码' })
  @IsString()
  code: string;
}

export class SendEmailCodeResponseDto {
  @ApiProperty({ description: '是否发送成功' })
  success: boolean;

  @ApiProperty({ description: '验证码（仅开发环境）' })
  code?: string;
}

export class VerifyEmailCodeResponseDto {
  @ApiProperty({ description: '验证码是否有效' })
  isValid: boolean;
} 