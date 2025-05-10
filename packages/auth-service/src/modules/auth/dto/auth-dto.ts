import { IsString, IsOptional, IsPhoneNumber, Matches, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UsernamePasswordLoginDto {
  @ApiProperty({ description: '用户名' })
  @IsString()
  username: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  password: string;
}

export class PhonePasswordLoginDto {
  @ApiProperty({ description: '手机号' })
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  password: string;
}

export class PhoneLoginDto {
  @ApiProperty({ description: '手机号' })
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone: string;

  @ApiProperty({ description: '验证码' })
  @IsString()
  code: string;
}

export class WechatLoginDto {
  @ApiProperty({ description: '微信授权码' })
  @IsString()
  code: string;
}

export class TokenResponseDto {
  @ApiProperty({ description: '访问令牌' })
  accessToken: string;

  @ApiProperty({ description: '刷新令牌' })
  refreshToken: string;

  @ApiProperty({ description: '令牌类型' })
  tokenType: string;

  @ApiProperty({ description: '过期时间（秒）' })
  expiresIn: number;
}

export class EmailLoginDto {
  @ApiProperty({ description: '邮箱地址' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @ApiProperty({ description: '验证码' })
  @IsString()
  code: string;
} 