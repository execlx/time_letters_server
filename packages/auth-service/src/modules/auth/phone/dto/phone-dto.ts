import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendCodeDto {
  @ApiProperty({ description: '手机号' })
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone: string;
}

export class VerifyCodeDto {
  @ApiProperty({ description: '手机号' })
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone: string;

  @ApiProperty({ description: '验证码' })
  @IsString()
  code: string;
}

export class SendCodeResponseDto {
  @ApiProperty({ description: '是否发送成功' })
  success: boolean;
}

export class VerifyCodeResponseDto {
  @ApiProperty({ description: '验证码是否有效' })
  isValid: boolean;
} 