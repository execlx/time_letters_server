import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthGuard } from '@nestjs/passport';
import { BusinessException } from '../../../common/exceptions/business.exception';
import { ErrorCode } from '../../../common/constants/errorcode.constant';

@Injectable()
export class WechatStrategy extends PassportStrategy(Strategy, 'wechat') {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(request: any): Promise<any> {
        const { code } = request.body;
        if (!code) {
            throw new BusinessException('微信授权码不能为空', ErrorCode.INVALID_PARAMS);
        }

        try {
            const user = await this.authService.validateUserByWechat(code);
            if (!user) {
                throw new BusinessException('用户不存在', ErrorCode.USER_NOT_FOUND);
            }
            return user;
        } catch (error) {
            if (error instanceof BusinessException) {
                throw error;
            }
            throw new BusinessException('微信登录失败', ErrorCode.WECHAT_ERROR);
        }
    }
}

export class WechatAuthGuard extends AuthGuard('wechat') {} 