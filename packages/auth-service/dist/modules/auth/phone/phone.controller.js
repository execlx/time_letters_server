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
exports.PhoneController = void 0;
const common_1 = require("@nestjs/common");
const phone_service_1 = require("./phone.service");
const swagger_1 = require("@nestjs/swagger");
const phone_dto_1 = require("./dto/phone-dto");
const business_exception_1 = require("../../../common/exceptions/business.exception");
const errorcode_constant_1 = require("../../../common/constants/errorcode.constant");
let PhoneController = class PhoneController {
    phoneService;
    constructor(phoneService) {
        this.phoneService = phoneService;
    }
    async verifyCode(verifyCodeDto) {
        try {
            const isValid = await this.phoneService.validateVerificationCode(verifyCodeDto.phone, verifyCodeDto.code);
            return { isValid };
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('验证码验证失败', errorcode_constant_1.ErrorCode.INVALID_PHONE_VERIFICATION_CODE);
        }
    }
    async sendVerificationCode(sendCodeDto) {
        try {
            const code = await this.phoneService.createVerificationCode(sendCodeDto.phone);
            return { success: true, code };
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('验证码发送失败', errorcode_constant_1.ErrorCode.SYSTEM_ERROR);
        }
    }
};
exports.PhoneController = PhoneController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '验证验证码' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '验证成功', type: phone_dto_1.VerifyCodeResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '验证失败' }),
    (0, swagger_1.ApiBody)({ type: phone_dto_1.VerifyCodeDto }),
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [phone_dto_1.VerifyCodeDto]),
    __metadata("design:returntype", Promise)
], PhoneController.prototype, "verifyCode", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '发送验证码' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '发送成功', type: phone_dto_1.SendCodeResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '发送失败' }),
    (0, swagger_1.ApiBody)({ type: phone_dto_1.SendCodeDto }),
    (0, common_1.Post)('send-code'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [phone_dto_1.SendCodeDto]),
    __metadata("design:returntype", Promise)
], PhoneController.prototype, "sendVerificationCode", null);
exports.PhoneController = PhoneController = __decorate([
    (0, swagger_1.ApiTags)('手机验证码'),
    (0, common_1.Controller)('phone'),
    __metadata("design:paramtypes", [phone_service_1.PhoneService])
], PhoneController);
//# sourceMappingURL=phone.controller.js.map