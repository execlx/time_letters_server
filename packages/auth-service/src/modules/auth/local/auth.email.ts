import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthGuard } from '@nestjs/passport';
import { BusinessException } from '../../../common/exceptions/business.exception';
import { ErrorCode } from '../../../common/constants/errorcode.constant';

@Injectable()
export class EmailStrategy extends PassportStrategy(Strategy, 'email') {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(request: any): Promise<any> {
        const { email, code } = request.body;
        if (!email || !code) {
            throw new BusinessException('邮箱和验证码不能为空', ErrorCode.INVALID_PARAMS);
        }

        try {
            const user = await this.authService.validateUserByEmail(email, code);
            if (!user) {
                throw new BusinessException('用户不存在', ErrorCode.USER_NOT_FOUND);
            }
            return user;
        } catch (error) {
            if (error instanceof BusinessException) {
                throw error;
            }
            throw new BusinessException('邮箱验证失败', ErrorCode.INVALID_CREDENTIALS);
        }
    }
}

export class EmailAuthGuard extends AuthGuard('email') {} 