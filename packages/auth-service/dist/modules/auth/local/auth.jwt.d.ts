import { Strategy } from 'passport-jwt';
import { JwtConfig, JWTPayload } from '../../../interfaces/config.interface';
import { UserService } from '../../user/user.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(jwtConfig: JwtConfig, userService: UserService);
    validate(payload: JWTPayload): Promise<import("../../user/entities/user.entity").User>;
}
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
}
export {};
