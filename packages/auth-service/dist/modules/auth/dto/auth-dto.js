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
exports.EmailLoginDto = exports.TokenResponseDto = exports.WechatLoginDto = exports.PhoneLoginDto = exports.PhonePasswordLoginDto = exports.UsernamePasswordLoginDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UsernamePasswordLoginDto {
    username;
    password;
}
exports.UsernamePasswordLoginDto = UsernamePasswordLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsernamePasswordLoginDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '密码' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsernamePasswordLoginDto.prototype, "password", void 0);
class PhonePasswordLoginDto {
    phone;
    password;
}
exports.PhonePasswordLoginDto = PhonePasswordLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手机号' }),
    (0, class_validator_1.Matches)(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' }),
    __metadata("design:type", String)
], PhonePasswordLoginDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '密码' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PhonePasswordLoginDto.prototype, "password", void 0);
class PhoneLoginDto {
    phone;
    code;
}
exports.PhoneLoginDto = PhoneLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手机号' }),
    (0, class_validator_1.Matches)(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' }),
    __metadata("design:type", String)
], PhoneLoginDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PhoneLoginDto.prototype, "code", void 0);
class WechatLoginDto {
    code;
}
exports.WechatLoginDto = WechatLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '微信授权码' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WechatLoginDto.prototype, "code", void 0);
class TokenResponseDto {
    accessToken;
    refreshToken;
    tokenType;
    expiresIn;
}
exports.TokenResponseDto = TokenResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '访问令牌' }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '刷新令牌' }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '令牌类型' }),
    __metadata("design:type", String)
], TokenResponseDto.prototype, "tokenType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '过期时间（秒）' }),
    __metadata("design:type", Number)
], TokenResponseDto.prototype, "expiresIn", void 0);
class EmailLoginDto {
    email;
    code;
}
exports.EmailLoginDto = EmailLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '邮箱地址' }),
    (0, class_validator_1.IsEmail)({}, { message: '邮箱格式不正确' }),
    __metadata("design:type", String)
], EmailLoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailLoginDto.prototype, "code", void 0);
//# sourceMappingURL=auth-dto.js.map