import { IsString, IsOptional, IsNumber, IsEmail, IsPhoneNumber, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsString()
  username: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  password: string;

  @ApiPropertyOptional({ description: '邮箱' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: '手机号' })
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  @IsOptional()
  phone?: string;
}

export class PhoneLoginDto {
  @ApiProperty({ description: '手机号' })
  phone: string;

  @ApiProperty({ description: '验证码' })
  code: string;
}

export class PhoneRegisterDto {
  @ApiProperty({ description: '手机号' })
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone: string;

  @ApiPropertyOptional({ description: '用户名' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({ description: '密码' })
  @IsString()
  @IsOptional()
  password?: string;
}

export class SendCodeDto {
  @ApiProperty({ description: '手机号' })
  phone: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ description: '用户名' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({ description: '邮箱' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: '手机号' })
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ description: '头像' })
  @IsString()
  @IsOptional()
  profilePicture?: string;
}

export class ResetPasswordDto {
  @ApiProperty({ description: '手机号' })
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone: string;

  @ApiProperty({ description: '新密码' })
  @IsString()
  password: string;
}

export class UsernamePasswordLoginDto {
  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '密码' })
  password: string;
}

export class WechatLoginDto {
  @ApiProperty({ description: '微信授权码' })
  code: string;
}

export class WechatRegisterDto {
  @ApiProperty({ description: '微信 OpenID' })
  @IsString()
  wechatOpenid: string;
}

export class SetPasswordDto {
  @ApiProperty({ description: '用户ID' })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: '新密码' })
  @IsString()
  password: string;
}
