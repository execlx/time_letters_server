import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { EmailVerification } from './entities/email-verification.entity';
import { Cache } from 'cache-manager';
export declare class EmailService {
    private readonly configService;
    private readonly emailVerificationRepository;
    private readonly cacheManager;
    private readonly logger;
    private transporter;
    private readonly VERIFICATION_CODE_TTL;
    constructor(configService: ConfigService, emailVerificationRepository: Repository<EmailVerification>, cacheManager: Cache);
    private verifyConnection;
    createVerificationCode(email: string): Promise<void>;
    validateVerificationCode(email: string, code: string): Promise<boolean>;
    private sendVerificationEmail;
}
