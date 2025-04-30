import { SetMetadata } from '@nestjs/common';
import { AUTH_STRATEGY } from '../constants/auth.constants';

export const Auth = (strategy: string) => SetMetadata('authStrategy', strategy);

export const LocalAuth = () => Auth(AUTH_STRATEGY.LOCAL);
export const PhoneAuth = () => Auth(AUTH_STRATEGY.PHONE);
export const WechatAuth = () => Auth(AUTH_STRATEGY.WECHAT);
export const JwtAuth = () => Auth(AUTH_STRATEGY.JWT); 