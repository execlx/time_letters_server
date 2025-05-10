import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PhoneService } from '../auth/phone/phone.service';
import { EmailService } from '../auth/email/email.service';
export declare class UserService {
    private userRepository;
    private readonly phoneService;
    private readonly emailService;
    private readonly logger;
    constructor(userRepository: Repository<User>, phoneService: PhoneService, emailService: EmailService);
    validateUser(username: string, password: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    findByPhone(phone: string): Promise<User | null>;
    findByWechat(openid: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    createUser(data: Partial<User>): Promise<User>;
    create(data: Partial<User>): Promise<User>;
    createByEmail(data: {
        email: string;
        code: string;
        username?: string;
    }): Promise<User>;
    createByPhone(data: {
        phone: string;
        code: string;
        username?: string;
    }): Promise<User>;
    createByWechat(data: {
        wechatOpenid: string;
    }): Promise<User>;
    setPassword(userId: number, password: string): Promise<void>;
    resetPassword(phone: string, password: string): Promise<void>;
    update(id: number, data: Partial<User>): Promise<User>;
}
