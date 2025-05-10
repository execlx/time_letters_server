import { AuthService } from './auth.service';
import { PhonePasswordLoginDto } from './dto/auth-dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginByUsernamePassword(req: any): Promise<{
        access_token: string;
    }>;
    loginByPhonePassword(loginDto: PhonePasswordLoginDto): Promise<{
        access_token: string;
    }>;
    loginByPhone(req: any): Promise<{
        access_token: string;
    }>;
    loginByWechat(req: any): Promise<{
        access_token: string;
    }>;
    loginByEmail(req: any): Promise<{
        access_token: string;
    }>;
}
