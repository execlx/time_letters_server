import { PhoneService } from './phone.service';
import { SendCodeDto, VerifyCodeDto } from './dto/phone-dto';
export declare class PhoneController {
    private readonly phoneService;
    constructor(phoneService: PhoneService);
    verifyCode(verifyCodeDto: VerifyCodeDto): Promise<{
        isValid: boolean;
    }>;
    sendVerificationCode(sendCodeDto: SendCodeDto): Promise<{
        success: boolean;
        code: string;
    }>;
}
