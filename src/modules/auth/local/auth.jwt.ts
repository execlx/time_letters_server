import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfig, JWTPayload } from '../../../interfaces/config.interface';
import { UserService } from '../../user/user.service';
import { BusinessException } from '../../../common/exceptions/business.exception';
import { ErrorCode } from '../../../common/constants/errorcode.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('JWT_CONFIG') jwtConfig: JwtConfig,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig.secret,
        });
    }

    async validate(payload: JWTPayload) {
        try {
            const user = await this.userService.findById(parseInt(payload.sub));
            if (!user) {
                throw new BusinessException('用户不存在', ErrorCode.USER_NOT_FOUND);
            }
            return user;
        } catch (error) {
            if (error instanceof BusinessException) {
                throw error;
            }
            throw new BusinessException('无效的令牌', ErrorCode.INVALID_TOKEN);
        }
    }
}

export class JwtAuthGuard extends AuthGuard('jwt') {}