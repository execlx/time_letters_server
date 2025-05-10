import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PhoneService } from './phone/phone.service';
import { EmailService } from './email/email.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    private readonly phoneService;
    private readonly emailService;
    private readonly logger;
    constructor(jwtService: JwtService, userService: UserService, phoneService: PhoneService, emailService: EmailService);
    validateUserByUsernamePassword(username: string, password: string): Promise<import("../user/entities/user.entity").User>;
    validateUserByPhonePassword(phone: string, password: string): Promise<import("../user/entities/user.entity").User>;
    validateUserByWechat(code: string): Promise<import("../user/entities/user.entity").User>;
    validateUserByPhone(phone: string, code: string): Promise<import("../user/entities/user.entity").User>;
    validateUserByEmail(email: string, code: string): Promise<import("../user/entities/user.entity").User>;
    validateRequest(request: any, strategy: string): Promise<boolean>;
    private validateLocal;
    private validatePhone;
    private validateJwt;
    private extractTokenFromHeader;
    generateToken(user: any): Promise<{
        access_token: string;
    }>;
}
