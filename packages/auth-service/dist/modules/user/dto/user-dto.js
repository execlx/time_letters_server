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
exports.SetPasswordDto = exports.WechatRegisterDto = exports.WechatLoginDto = exports.UsernamePasswordLoginDto = exports.ResetPasswordDto = exports.UpdateUserDto = exports.SendCodeDto = exports.EmailRegisterDto = exports.PhoneRegisterDto = exports.PhoneLoginDto = exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateUserDto {
    username;
    password;
    email;
    phone;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '密码' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '邮箱' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '手机号' }),
    (0, class_validator_1.Matches)(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
class PhoneLoginDto {
    phone;
    code;
}
exports.PhoneLoginDto = PhoneLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手机号' }),
    __metadata("design:type", String)
], PhoneLoginDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码' }),
    __metadata("design:type", String)
], PhoneLoginDto.prototype, "code", void 0);
class PhoneRegisterDto {
    phone;
    code;
    username;
}
exports.PhoneRegisterDto = PhoneRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手机号' }),
    (0, class_validator_1.IsPhoneNumber)('CN'),
    __metadata("design:type", String)
], PhoneRegisterDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PhoneRegisterDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名（可选）' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PhoneRegisterDto.prototype, "username", void 0);
class EmailRegisterDto {
    email;
    code;
    username;
}
exports.EmailRegisterDto = EmailRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '邮箱' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], EmailRegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailRegisterDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名（可选）' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EmailRegisterDto.prototype, "username", void 0);
class SendCodeDto {
    phone;
}
exports.SendCodeDto = SendCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手机号' }),
    __metadata("design:type", String)
], SendCodeDto.prototype, "phone", void 0);
class UpdateUserDto {
    username;
    email;
    phone;
    profilePicture;
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '用户名（可选）' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '邮箱' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '手机号' }),
    (0, class_validator_1.Matches)(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '头像URL（可选）' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "profilePicture", void 0);
class ResetPasswordDto {
    phone;
    password;
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手机号' }),
    (0, class_validator_1.IsPhoneNumber)('CN'),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '新密码' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
class UsernamePasswordLoginDto {
    username;
    password;
}
exports.UsernamePasswordLoginDto = UsernamePasswordLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名' }),
    __metadata("design:type", String)
], UsernamePasswordLoginDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '密码' }),
    __metadata("design:type", String)
], UsernamePasswordLoginDto.prototype, "password", void 0);
class WechatLoginDto {
    code;
}
exports.WechatLoginDto = WechatLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '微信授权码' }),
    __metadata("design:type", String)
], WechatLoginDto.prototype, "code", void 0);
class WechatRegisterDto {
    wechatOpenid;
}
exports.WechatRegisterDto = WechatRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '微信 OpenID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WechatRegisterDto.prototype, "wechatOpenid", void 0);
class SetPasswordDto {
    userId;
    password;
}
exports.SetPasswordDto = SetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户ID' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SetPasswordDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '新密码' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], SetPasswordDto.prototype, "password", void 0);
//# sourceMappingURL=user-dto.js.map