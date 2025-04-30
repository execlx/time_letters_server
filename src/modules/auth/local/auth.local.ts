import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'username', // Specify the field for username
            passwordField: 'password', // Specify the field for password
        });
    }

    async validate(username: string, password: string): Promise<any> {
        try {
            const user = await this.authService.validateUserByUsernamePassword(username, password);
            return user;
        } catch (error) {
            throw new UnauthorizedException(error.message || 'Invalid credentials');
        }
    }
}

export class LocalAuthGuard extends AuthGuard('local') {}