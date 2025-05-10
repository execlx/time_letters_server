import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthGuard } from '@nestjs/passport';
import { BusinessException } from '../../../common/exceptions/business.exception';
import { ErrorCode } from '../../../common/constants/errorcode.constant';

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
            if (!user) {
                throw new BusinessException('用户不存在', ErrorCode.USER_NOT_FOUND);
            }
            return user;
        } catch (error) {
            if (error instanceof BusinessException) {
                throw error;
            }
            throw new BusinessException('用户名或密码错误', ErrorCode.INVALID_CREDENTIALS);
        }
    }
}

export class LocalAuthGuard extends AuthGuard('local') {}