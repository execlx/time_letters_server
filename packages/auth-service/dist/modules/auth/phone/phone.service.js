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
exports.PhoneService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const phone_verification_entity_1 = require("./entities/phone-verification.entity");
const business_exception_1 = require("../../../common/exceptions/business.exception");
const errorcode_constant_1 = require("../../../common/constants/errorcode.constant");
const logger_service_1 = require("../../logger/logger.service");
let PhoneService = class PhoneService {
    phoneVerificationRepository;
    logger;
    constructor(phoneVerificationRepository) {
        this.phoneVerificationRepository = phoneVerificationRepository;
        this.logger = new logger_service_1.LoggerService();
        this.logger.setContext('手机验证码服务');
    }
    async createVerificationCode(phone) {
        this.logger.debug(`开始创建手机验证码: ${phone}`, 'createVerificationCode');
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const verification = this.phoneVerificationRepository.create({
            phone,
            code,
        });
        await this.phoneVerificationRepository.save(verification);
        this.logger.log(`手机验证码创建成功: ${phone}`, 'createVerificationCode');
        return code;
    }
    async validateVerificationCode(phone, code) {
        this.logger.debug(`开始验证手机验证码: ${phone}`, 'validateVerificationCode');
        const verification = await this.phoneVerificationRepository.findOne({
            where: { phone, code },
            order: { createdAt: 'DESC' },
        });
        if (!verification) {
            this.logger.warn(`验证码不存在: ${phone}`, 'validateVerificationCode');
            throw new business_exception_1.BusinessException('验证码不存在', errorcode_constant_1.ErrorCode.INVALID_PHONE_VERIFICATION_CODE);
        }
        const expiryTime = new Date(verification.createdAt);
        expiryTime.setMinutes(expiryTime.getMinutes() + 10);
        if (new Date() > expiryTime) {
            this.logger.warn(`验证码已过期: ${phone}`, 'validateVerificationCode');
            throw new business_exception_1.BusinessException('验证码已过期', errorcode_constant_1.ErrorCode.PHONE_VERIFICATION_CODE_EXPIRED);
        }
        await this.phoneVerificationRepository.remove(verification);
        this.logger.log(`手机验证码验证成功: ${phone}`, 'validateVerificationCode');
        return true;
    }
    async sendSMS(phone, code) {
        this.logger.debug(`开始发送验证短信: ${phone}`, 'sendSMS');
        this.logger.log(`验证短信发送成功: ${phone}`, 'sendSMS');
    }
};
exports.PhoneService = PhoneService;
exports.PhoneService = PhoneService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(phone_verification_entity_1.PhoneVerification)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PhoneService);
//# sourceMappingURL=phone.service.js.map