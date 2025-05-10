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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_local_1 = require("./local/auth.local");
const auth_phone_1 = require("./local/auth.phone");
const auth_wechat_1 = require("./local/auth.wechat");
const public_decorator_1 = require("./decorators/public.decorator");
const swagger_1 = require("@nestjs/swagger");
const auth_dto_1 = require("./dto/auth-dto");
const business_exception_1 = require("../../common/exceptions/business.exception");
const errorcode_constant_1 = require("../../common/constants/errorcode.constant");
const auth_email_1 = require("./local/auth.email");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async loginByUsernamePassword(req) {
        try {
            return this.authService.generateToken(req.user);
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('登录失败', errorcode_constant_1.ErrorCode.INVALID_CREDENTIALS);
        }
    }
    async loginByPhonePassword(loginDto) {
        try {
            const user = await this.authService.validateUserByPhonePassword(loginDto.phone, loginDto.password);
            return this.authService.generateToken(user);
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('登录失败', errorcode_constant_1.ErrorCode.INVALID_CREDENTIALS);
        }
    }
    async loginByPhone(req) {
        try {
            return this.authService.generateToken(req.user);
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('登录失败', errorcode_constant_1.ErrorCode.INVALID_CREDENTIALS);
        }
    }
    async loginByWechat(req) {
        try {
            return this.authService.generateToken(req.user);
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('微信登录失败', errorcode_constant_1.ErrorCode.WECHAT_ERROR);
        }
    }
    async loginByEmail(req) {
        try {
            return this.authService.generateToken(req.user);
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('邮箱登录失败', errorcode_constant_1.ErrorCode.INVALID_CREDENTIALS);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '用户名密码登录' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '登录成功', type: auth_dto_1.TokenResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '登录失败' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.UsernamePasswordLoginDto }),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(auth_local_1.LocalAuthGuard),
    (0, common_1.Post)('login/username'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginByUsernamePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '手机号密码登录' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '登录成功', type: auth_dto_1.TokenResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '登录失败' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.PhonePasswordLoginDto }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login/phone/password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.PhonePasswordLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginByPhonePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '手机号验证码登录' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '登录成功', type: auth_dto_1.TokenResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '登录失败' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.PhoneLoginDto }),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(auth_phone_1.PhoneAuthGuard),
    (0, common_1.Post)('login/phone/code'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginByPhone", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '微信登录' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '登录成功', type: auth_dto_1.TokenResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '登录失败' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.WechatLoginDto }),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(auth_wechat_1.WechatAuthGuard),
    (0, common_1.Post)('login/wechat'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginByWechat", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '邮箱验证码登录' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '登录成功', type: auth_dto_1.TokenResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '登录失败' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.EmailLoginDto }),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(auth_email_1.EmailAuthGuard),
    (0, common_1.Post)('login/email'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginByEmail", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('认证'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map