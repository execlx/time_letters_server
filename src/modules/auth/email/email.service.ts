import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { LoggerService } from '../../logger/logger.service';
import { LOGGER_CONTEXT } from '../../logger/constants/logger.constants';
import { EmailVerification } from './entities/email-verification.entity';

interface EmailConfig {
    host: string;
    port: number;
    user: string;
    pass: string;
    from: string;
    name: string;
}

@Injectable()
export class EmailService {
    private readonly logger = new LoggerService(LOGGER_CONTEXT.EMAIL);
    private transporter: nodemailer.Transporter;

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(EmailVerification)
        private readonly emailVerificationRepository: Repository<EmailVerification>,
    ) {
        const host = this.configService.get<string>('EMAIL_HOST');
        const port = this.configService.get<number>('EMAIL_PORT');
        const user = this.configService.get<string>('EMAIL_USER');
        const pass = this.configService.get<string>('EMAIL_PASS');
        const from = this.configService.get<string>('EMAIL_FROM');
        const name = this.configService.get<string>('EMAIL_NAME');

        if (!host || !port || !user || !pass || !from || !name) {
            throw new Error('邮件配置不完整，请检查环境变量');
        }

        const emailConfig: EmailConfig = {
            host,
            port,
            user,
            pass,
            from,
            name,
        };

        this.transporter = nodemailer.createTransport({
            host: emailConfig.host,
            port: emailConfig.port,
            secure: true, // 使用 SSL
            auth: {
                user: emailConfig.user,
                pass: emailConfig.pass,
            },
        });

        // 验证邮件配置
        this.verifyConnection();
    }

    private async verifyConnection() {
        try {
            await this.transporter.verify();
            this.logger.log('邮件服务连接成功', 'verifyConnection');
        } catch (error) {
            this.logger.error('邮件服务连接失败', error.stack, 'verifyConnection');
            throw error;
        }
    }

    async createVerificationCode(email: string): Promise<void> {
        this.logger.debug(`开始创建邮件验证码: ${email}`);
        
        // 生成6位随机验证码
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        // 设置验证码过期时间为10分钟后
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);

        // 保存验证码到数据库
        const verification = this.emailVerificationRepository.create({
            email,
            code,
            expiresAt,
        });
        await this.emailVerificationRepository.save(verification);

        // 发送验证邮件
        await this.sendVerificationEmail(email, code);

        this.logger.log(`邮件验证码创建成功: ${email}`);
    }

    async validateVerificationCode(email: string, code: string): Promise<boolean> {
        this.logger.debug(`开始验证邮件验证码: ${email}`);
        
        const verification = await this.emailVerificationRepository.findOne({
            where: { email, code },
        });

        if (!verification) {
            this.logger.warn(`验证码不存在: ${email}`);
            return false;
        }

        if (verification.expiresAt < new Date()) {
            this.logger.warn(`验证码已过期: ${email}`);
            return false;
        }

        // 验证成功后删除验证码记录
        await this.emailVerificationRepository.remove(verification);

        this.logger.log(`邮件验证码验证成功: ${email}`);
        return true;
    }

    private async sendVerificationEmail(to: string, code: string): Promise<void> {
        this.logger.debug(`开始发送验证邮件: ${to}`, 'sendVerificationEmail');

        const from = this.configService.get<string>('EMAIL_FROM');
        const name = this.configService.get<string>('EMAIL_NAME');

        if (!from || !name) {
            throw new Error('邮件发件人配置不完整');
        }

        const emailConfig = {
            from: `"${name}" <${from}>`,
            to,
            subject: '邮箱验证码',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">邮箱验证码</h2>
                    <p style="color: #666;">您好，</p>
                    <p style="color: #666;">您的验证码是：</p>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
                        <span style="font-size: 24px; font-weight: bold; color: #333;">${code}</span>
                    </div>
                    <p style="color: #666;">验证码有效期为10分钟，请尽快使用。</p>
                    <p style="color: #666;">如果这不是您的操作，请忽略此邮件。</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #999; font-size: 12px;">此邮件由系统自动发送，请勿回复。</p>
                </div>
            `,
        };

        try {
            await this.transporter.sendMail(emailConfig);
            this.logger.log(`验证邮件发送成功: ${to}`, 'sendVerificationEmail');
        } catch (error) {
            this.logger.error(`验证邮件发送失败: ${to}`, error.stack, 'sendVerificationEmail');
            throw error;
        }
    }
} 