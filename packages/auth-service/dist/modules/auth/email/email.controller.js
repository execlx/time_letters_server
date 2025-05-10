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
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
const swagger_1 = require("@nestjs/swagger");
const email_dto_1 = require("./dto/email-dto");
const business_exception_1 = require("../../../common/exceptions/business.exception");
const errorcode_constant_1 = require("../../../common/constants/errorcode.constant");
const class_validator_1 = require("class-validator");
class SendVerificationCodeDto {
    email;
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SendVerificationCodeDto.prototype, "email", void 0);
class VerifyCodeDto {
    email;
    code;
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], VerifyCodeDto.prototype, "email", void 0);
let EmailController = class EmailController {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
    async verifyCode(verifyCodeDto) {
        try {
            const isValid = await this.emailService.validateVerificationCode(verifyCodeDto.email, verifyCodeDto.code);
            return { isValid };
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('验证码验证失败', errorcode_constant_1.ErrorCode.INVALID_EMAIL_VERIFICATION_CODE);
        }
    }
    async sendVerificationCode(dto) {
        await this.emailService.createVerificationCode(dto.email);
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '验证邮箱验证码' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '验证成功', type: email_dto_1.VerifyEmailCodeResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '验证失败' }),
    (0, swagger_1.ApiBody)({ type: email_dto_1.VerifyEmailCodeDto }),
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_dto_1.VerifyEmailCodeDto]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "verifyCode", null);
__decorate([
    (0, common_1.Post)('send-code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: '发送邮箱验证码' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '发送成功', type: email_dto_1.SendEmailCodeResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '发送失败' }),
    (0, swagger_1.ApiBody)({ type: email_dto_1.SendEmailCodeDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SendVerificationCodeDto]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendVerificationCode", null);
exports.EmailController = EmailController = __decorate([
    (0, swagger_1.ApiTags)('邮箱验证码'),
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailController);
//# sourceMappingURL=email.controller.js.map