import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTH_STRATEGY } from './constants/auth.constants';
import { UserService } from '../user/user.service';
import { PhoneService } from './phone/phone.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private phoneService: PhoneService,
  ) {}

  async validateUserByUsernamePassword(username: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async validateUserByWechat(code: string): Promise<any> {
    // TODO: 实现微信验证逻辑
    throw new UnauthorizedException('WeChat authentication not implemented');
  }

  async validateUserByPhone(phone: string, code: string): Promise<any> {
    const isValid = await this.phoneService.validateVerificationCode(phone, code);
    if (!isValid) {
      throw new UnauthorizedException('Invalid phone verification code');
    }
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async validateRequest(request: any, strategy: string): Promise<boolean> {
    switch (strategy) {
      case AUTH_STRATEGY.LOCAL:
        return this.validateLocal(request);
      case AUTH_STRATEGY.PHONE:
        return this.validatePhone(request);
      case AUTH_STRATEGY.JWT:
        return this.validateJwt(request);
      default:
        throw new UnauthorizedException('Invalid authentication strategy');
    }
  }

  private async validateLocal(request: any): Promise<boolean> {
    const { username, password } = request.body;
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    request.user = user;
    return true;
  }

  private async validatePhone(request: any): Promise<boolean> {
    const { phone, code } = request.body;
    const isValid = await this.phoneService.validateVerificationCode(phone, code);
    if (!isValid) {
      throw new UnauthorizedException('Invalid phone verification code');
    }
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    request.user = user;
    return true;
  }

  private async validateJwt(request: any): Promise<boolean> {
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.userService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      request.user = user;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async generateToken(user: any): Promise<string> {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.signAsync(payload);
  }
} 