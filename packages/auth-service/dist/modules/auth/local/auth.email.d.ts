import { Strategy } from 'passport-custom';
import { AuthService } from '../auth.service';
declare const EmailStrategy_base: new () => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class EmailStrategy extends EmailStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(request: any): Promise<any>;
}
declare const EmailAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class EmailAuthGuard extends EmailAuthGuard_base {
}
export {};
