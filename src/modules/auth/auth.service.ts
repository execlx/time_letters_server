import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // 验证用户名密码
  async validateUserByUsernamePassword(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await this.validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  // 验证手机号验证码
  async validateUserByPhone(phone: string, code: string): Promise<User> {
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // TODO: 验证验证码
    // const isValidCode = await this.validateVerificationCode(phone, code);
    // if (!isValidCode) {
    //   throw new UnauthorizedException('Invalid verification code');
    // }

    return user;
  }

  // 验证微信登录
  async validateUserByWechat(code: string): Promise<User> {
    // TODO: 获取微信用户信息
    // const wechatUser = await this.wechatService.getUserInfo(code);
    const wechatUser = { openid: 'test_openid' };

    const user = await this.userService.findByWechatOpenId(wechatUser.openid);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  // 生成 JWT token
  async generateToken(user: User) {
    const payload = { 
      sub: user.id, 
      username: user.username 
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone
      }
    };
  }

  // 验证密码
  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // 加密密码
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
