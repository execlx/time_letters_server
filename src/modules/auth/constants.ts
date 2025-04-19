import { randomBytes } from 'crypto';

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'default_jwt_secret', // 优先使用环境变量中的密钥
  expiresIn: '1h', // JWT 过期时间
};