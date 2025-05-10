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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailCodeResponseDto = exports.SendEmailCodeResponseDto = exports.VerifyEmailCodeDto = exports.SendEmailCodeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SendEmailCodeDto {
    email;
}
exports.SendEmailCodeDto = SendEmailCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '邮箱地址' }),
    (0, class_validator_1.IsEmail)({}, { message: '邮箱格式不正确' }),
    __metadata("design:type", String)
], SendEmailCodeDto.prototype, "email", void 0);
class VerifyEmailCodeDto {
    email;
    code;
}
exports.VerifyEmailCodeDto = VerifyEmailCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '邮箱地址' }),
    (0, class_validator_1.IsEmail)({}, { message: '邮箱格式不正确' }),
    __metadata("design:type", String)
], VerifyEmailCodeDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyEmailCodeDto.prototype, "code", void 0);
class SendEmailCodeResponseDto {
    success;
    code;
}
exports.SendEmailCodeResponseDto = SendEmailCodeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '是否发送成功' }),
    __metadata("design:type", Boolean)
], SendEmailCodeResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码（仅开发环境）' }),
    __metadata("design:type", String)
], SendEmailCodeResponseDto.prototype, "code", void 0);
class VerifyEmailCodeResponseDto {
    isValid;
}
exports.VerifyEmailCodeResponseDto = VerifyEmailCodeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码是否有效' }),
    __metadata("design:type", Boolean)
], VerifyEmailCodeResponseDto.prototype, "isValid", void 0);
//# sourceMappingURL=email-dto.js.map