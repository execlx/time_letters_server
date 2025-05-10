import { Repository } from 'typeorm';
import { PhoneVerification } from './entities/phone-verification.entity';
export declare class PhoneService {
    private readonly phoneVerificationRepository;
    private readonly logger;
    constructor(phoneVerificationRepository: Repository<PhoneVerification>);
    createVerificationCode(phone: string): Promise<string>;
    validateVerificationCode(phone: string, code: string): Promise<boolean>;
    private sendSMS;
}
