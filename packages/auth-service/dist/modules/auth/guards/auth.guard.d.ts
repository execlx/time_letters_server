import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
export declare class AuthGuard implements CanActivate {
    private reflector;
    private authService;
    constructor(reflector: Reflector, authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
declare const LocalAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalAuthGuard extends LocalAuthGuard_base {
}
declare const WechatAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class WechatAuthGuard extends WechatAuthGuard_base {
}
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
}
export {};
