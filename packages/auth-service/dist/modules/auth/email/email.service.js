"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nodemailer = require("nodemailer");
const logger_service_1 = require("../../logger/logger.service");
const email_verification_entity_1 = require("./entities/email-verification.entity");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_2 = require("@nestjs/common");
const business_exception_1 = require("../../../common/exceptions/business.exception");
const errorcode_constant_1 = require("../../../common/constants/errorcode.constant");
let EmailService = class EmailService {
    configService;
    emailVerificationRepository;
    cacheManager;
    logger;
    transporter;
    VERIFICATION_CODE_TTL = 600;
    constructor(configService, emailVerificationRepository, cacheManager) {
        this.configService = configService;
        this.emailVerificationRepository = emailVerificationRepository;
        this.cacheManager = cacheManager;
        this.logger = new logger_service_1.LoggerService();
        this.logger.setContext('邮箱验证码服务');
        const host = this.configService.get('EMAIL_HOST');
        const port = this.configService.get('EMAIL_PORT');
        const user = this.configService.get('EMAIL_USER');
        const pass = this.configService.get('EMAIL_PASS');
        const from = this.configService.get('EMAIL_FROM');
        const name = this.configService.get('EMAIL_NAME');
        if (!host || !port || !user || !pass || !from || !name) {
            throw new Error('邮件配置不完整，请检查环境变量');
        }
        const emailConfig = {
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
            secure: true,
            auth: {
                user: emailConfig.user,
                pass: emailConfig.pass,
            },
        });
        this.verifyConnection();
    }
    async verifyConnection() {
        try {
            await this.transporter.verify();
            this.logger.log('邮件服务连接成功', 'verifyConnection');
        }
        catch (error) {
            this.logger.error('邮件服务连接失败', error.stack, 'verifyConnection');
            throw error;
        }
    }
    async createVerificationCode(email) {
        this.logger.debug(`开始创建邮件验证码: ${email}`);
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const key = `email:verification:${email}`;
        await this.cacheManager.set(key, code, this.VERIFICATION_CODE_TTL * 1000);
        await this.sendVerificationEmail(email, code);
        this.logger.log(`邮件验证码创建成功: ${email}`);
    }
    async validateVerificationCode(email, code) {
        this.logger.debug(`开始验证邮件验证码: ${email}`);
        const key = `email:verification:${email}`;
        const storedCode = await this.cacheManager.get(key);
        if (!storedCode) {
            this.logger.warn(`验证码不存在或已过期: ${email}`);
            throw new business_exception_1.BusinessException('验证码不存在或已过期', errorcode_constant_1.ErrorCode.INVALID_EMAIL_VERIFICATION_CODE);
        }
        if (storedCode !== code) {
            this.logger.warn(`验证码不匹配: ${email}`);
            throw new business_exception_1.BusinessException('验证码不正确', errorcode_constant_1.ErrorCode.INVALID_EMAIL_VERIFICATION_CODE);
        }
        await this.cacheManager.del(key);
        this.logger.log(`邮件验证码验证成功: ${email}`);
        return true;
    }
    async sendVerificationEmail(to, code) {
        this.logger.debug(`开始发送验证邮件: ${to}`, 'sendVerificationEmail');
        const from = this.configService.get('EMAIL_FROM');
        const name = this.configService.get('EMAIL_NAME');
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
        }
        catch (error) {
            this.logger.error(`验证邮件发送失败: ${to}`, error.stack, 'sendVerificationEmail');
            throw error;
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(email_verification_entity_1.EmailVerification)),
    __param(2, (0, common_2.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository, Object])
], EmailService);
//# sourceMappingURL=email.service.js.map