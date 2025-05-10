import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneVerification } from './entities/phone-verification.entity';
import { BusinessException } from '../../../common/exceptions/business.exception';
import { ErrorCode } from '../../../common/constants/errorcode.constant';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class PhoneService {
    private readonly logger: LoggerService;

    constructor(
        @InjectRepository(PhoneVerification)
        private readonly phoneVerificationRepository: Repository<PhoneVerification>,
    ) {
        this.logger = new LoggerService();
        this.logger.setContext('手机验证码服务');
    }

    async createVerificationCode(phone: string): Promise<string> {
        this.logger.debug(`开始创建手机验证码: ${phone}`, 'createVerificationCode');
        // 生成6位数字验证码
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        // 创建新的验证码记录
        const verification = this.phoneVerificationRepository.create({
            phone,
            code,
        });

        await this.phoneVerificationRepository.save(verification);
        this.logger.log(`手机验证码创建成功: ${phone}`, 'createVerificationCode');

        // TODO: 实际发送短信
        // await this.sendSMS(phone, code);

        return code;
    }

    async validateVerificationCode(phone: string, code: string): Promise<boolean> {
        this.logger.debug(`开始验证手机验证码: ${phone}`, 'validateVerificationCode');
        const verification = await this.phoneVerificationRepository.findOne({
            where: { phone, code },
            order: { createdAt: 'DESC' },
        });
        
        if (!verification) {
            this.logger.warn(`验证码不存在: ${phone}`, 'validateVerificationCode');
            throw new BusinessException('验证码不存在', ErrorCode.INVALID_PHONE_VERIFICATION_CODE);
        }

        // 检查验证码是否过期（10分钟）
        const expiryTime = new Date(verification.createdAt);
        expiryTime.setMinutes(expiryTime.getMinutes() + 10);

        if (new Date() > expiryTime) {
            this.logger.warn(`验证码已过期: ${phone}`, 'validateVerificationCode');
            throw new BusinessException('验证码已过期', ErrorCode.PHONE_VERIFICATION_CODE_EXPIRED);
        }

        // 验证成功后删除验证码
        await this.phoneVerificationRepository.remove(verification);
        this.logger.log(`手机验证码验证成功: ${phone}`, 'validateVerificationCode');
        return true;
    }

    private async sendSMS(phone: string, code: string): Promise<void> {
        this.logger.debug(`开始发送验证短信: ${phone}`, 'sendSMS');
        // TODO: 实现实际的短信发送逻辑
        // 可以使用阿里云短信服务或其他短信服务
        this.logger.log(`验证短信发送成功: ${phone}`, 'sendSMS');
    }
} 