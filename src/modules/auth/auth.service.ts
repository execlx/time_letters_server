import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService, // 注入 JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username); // 使用用户名查找用户
    if (user && (await bcrypt.compare(password, user.password))) {
      // 如果验证成功，可以返回用户信息（通常不包括密码）
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid username or password');
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password); // 验证用户
    const payload = { username: user.username, sub: user.id }; // 定义 JWT payload
    return {
      access_token: this.jwtService.sign(payload), // 生成 JWT
    };
  }
}
