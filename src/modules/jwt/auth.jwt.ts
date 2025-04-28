import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfig } from '../../interfaces/config.interface';
import { JWTPayload } from '../../interfaces/jwt.payload';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('JWT_CONFIG') jwtConfig: JwtConfig){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中提取 JWT
      ignoreExpiration: false, // 如果 JWT 过期，则拒绝请求
      secretOrKey: jwtConfig.secret, 
    });
  }

  async validate(payload: JWTPayload) {
    // 返回解码后的 JWT payload，通常包含用户信息
    return { userId: payload.sub, username: payload.username };
  }
}