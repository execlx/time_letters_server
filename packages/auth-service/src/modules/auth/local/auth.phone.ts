import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthGuard } from '@nestjs/passport';
import { BusinessException } from '../../../common/exceptions/business.exception';
import { ErrorCode } from '../../../common/constants/errorcode.constant';

@Injectable()
export class PhoneStrategy extends PassportStrategy(Strategy, 'phone') {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(request: any): Promise<any> {
        const { phone, code } = request.body;
        if (!phone || !code) {
            throw new BusinessException('手机号和验证码不能为空', ErrorCode.INVALID_PARAMS);
        }

        try {
            const user = await this.authService.validateUserByPhone(phone, code);
            if (!user) {
                throw new BusinessException('用户不存在', ErrorCode.USER_NOT_FOUND);
            }
            return user;
        } catch (error) {
            if (error instanceof BusinessException) {
                throw error;
            }
            throw new BusinessException('手机验证码无效或已过期', ErrorCode.INVALID_PHONE_VERIFICATION_CODE);
        }
    }
}

export class PhoneAuthGuard extends AuthGuard('phone') {} 