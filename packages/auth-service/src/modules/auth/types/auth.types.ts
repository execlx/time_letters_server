import { User } from '../../user/entities/user.entity';

export interface JwtPayload {
  sub: number;
  username: string;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
    email?: string;
    phone?: string;
  };
}

export interface AuthRequest {
  user: User;
}

export interface PhoneAuthRequest {
  phone: string;
  code: string;
}

export interface WechatAuthRequest {
  code: string;
}

export interface UsernameAuthRequest {
  username: string;
  password: string;
} 