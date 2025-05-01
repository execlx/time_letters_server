import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EmailStrategy extends PassportStrategy(Strategy, 'email') {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(request: any): Promise<any> {
        const { email, code } = request.body;
        if (!email || !code) {
            throw new UnauthorizedException('Email and verification code are required');
        }

        try {
            const user = await this.authService.validateUserByEmail(email, code);
            return user;
        } catch (error) {
            throw new UnauthorizedException(error.message || 'Invalid email or verification code');
        }
    }
}

export class EmailAuthGuard extends AuthGuard('email') {} 