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
exports.VerifyCodeResponseDto = exports.SendCodeResponseDto = exports.VerifyCodeDto = exports.SendCodeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SendCodeDto {
    phone;
}
exports.SendCodeDto = SendCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手机号' }),
    (0, class_validator_1.Matches)(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' }),
    __metadata("design:type", String)
], SendCodeDto.prototype, "phone", void 0);
class VerifyCodeDto {
    phone;
    code;
}
exports.VerifyCodeDto = VerifyCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手机号' }),
    (0, class_validator_1.Matches)(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' }),
    __metadata("design:type", String)
], VerifyCodeDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyCodeDto.prototype, "code", void 0);
class SendCodeResponseDto {
    success;
}
exports.SendCodeResponseDto = SendCodeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '是否发送成功' }),
    __metadata("design:type", Boolean)
], SendCodeResponseDto.prototype, "success", void 0);
class VerifyCodeResponseDto {
    isValid;
}
exports.VerifyCodeResponseDto = VerifyCodeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码是否有效' }),
    __metadata("design:type", Boolean)
], VerifyCodeResponseDto.prototype, "isValid", void 0);
//# sourceMappingURL=phone-dto.js.map