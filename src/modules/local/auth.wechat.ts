import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WechatStrategy extends PassportStrategy(Strategy, 'wechat') {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(request: any): Promise<any> {
        const { code } = request.body;
        if (!code) {
            throw new UnauthorizedException('WeChat code is required');
        }

        try {
            const user = await this.authService.validateUserByWechat(code);
            return user;
        } catch (error) {
            throw new UnauthorizedException(error.message || 'Invalid WeChat code');
        }
    }
}

export class WechatAuthGuard extends AuthGuard('wechat') {} 