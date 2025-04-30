import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class PhoneStrategy extends PassportStrategy(Strategy, 'phone') {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(request: any): Promise<any> {
        const { phone, code } = request.body;
        if (!phone || !code) {
            throw new UnauthorizedException('Phone and verification code are required');
        }

        try {
            const user = await this.authService.validateUserByPhone(phone, code);
            return user;
        } catch (error) {
            throw new UnauthorizedException(error.message || 'Invalid phone or verification code');
        }
    }
}

export class PhoneAuthGuard extends AuthGuard('phone') {} 