import { Strategy } from 'passport-custom';
import { AuthService } from '../auth.service';
declare const WechatStrategy_base: new () => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class WechatStrategy extends WechatStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(request: any): Promise<any>;
}
declare const WechatAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class WechatAuthGuard extends WechatAuthGuard_base {
}
export {};
