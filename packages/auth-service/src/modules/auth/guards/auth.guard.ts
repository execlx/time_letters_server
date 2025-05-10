import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const strategy = this.reflector.get<string>('authStrategy', context.getHandler());
    if (!strategy) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    return this.authService.validateRequest(request, strategy);
  }
}

export class LocalAuthGuard extends PassportAuthGuard('local') {}
export class WechatAuthGuard extends PassportAuthGuard('wechat') {}
export class JwtAuthGuard extends PassportAuthGuard('jwt') {} 