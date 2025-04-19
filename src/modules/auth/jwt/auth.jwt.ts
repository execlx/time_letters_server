import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中提取 JWT
      ignoreExpiration: false, // 如果 JWT 过期，则拒绝请求
      secretOrKey: jwtConstants.secret, // 使用 constants.ts 中定义的密钥
    });
  }

  async validate(payload: any) {
    // 返回解码后的 JWT payload，通常包含用户信息
    return { userId: payload.sub, username: payload.username };
  }
}