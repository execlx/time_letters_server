import { EmailService } from './email.service';
import { VerifyEmailCodeDto } from './dto/email-dto';
declare class SendVerificationCodeDto {
    email: string;
}
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    verifyCode(verifyCodeDto: VerifyEmailCodeDto): Promise<{
        isValid: boolean;
    }>;
    sendVerificationCode(dto: SendVerificationCodeDto): Promise<void>;
}
export {};
