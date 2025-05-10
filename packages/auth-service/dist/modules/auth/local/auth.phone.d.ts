import { Strategy } from 'passport-custom';
import { AuthService } from '../auth.service';
declare const PhoneStrategy_base: new () => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class PhoneStrategy extends PhoneStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(request: any): Promise<any>;
}
declare const PhoneAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class PhoneAuthGuard extends PhoneAuthGuard_base {
}
export {};
