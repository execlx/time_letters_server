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
exports.WechatAuthGuard = exports.WechatStrategy = void 0;
const passport_custom_1 = require("passport-custom");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
const passport_2 = require("@nestjs/passport");
const business_exception_1 = require("../../../common/exceptions/business.exception");
const errorcode_constant_1 = require("../../../common/constants/errorcode.constant");
let WechatStrategy = class WechatStrategy extends (0, passport_1.PassportStrategy)(passport_custom_1.Strategy, 'wechat') {
    authService;
    constructor(authService) {
        super();
        this.authService = authService;
    }
    async validate(request) {
        const { code } = request.body;
        if (!code) {
            throw new business_exception_1.BusinessException('微信授权码不能为空', errorcode_constant_1.ErrorCode.INVALID_PARAMS);
        }
        try {
            const user = await this.authService.validateUserByWechat(code);
            if (!user) {
                throw new business_exception_1.BusinessException('用户不存在', errorcode_constant_1.ErrorCode.USER_NOT_FOUND);
            }
            return user;
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('微信登录失败', errorcode_constant_1.ErrorCode.WECHAT_ERROR);
        }
    }
};
exports.WechatStrategy = WechatStrategy;
exports.WechatStrategy = WechatStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], WechatStrategy);
class WechatAuthGuard extends (0, passport_2.AuthGuard)('wechat') {
}
exports.WechatAuthGuard = WechatAuthGuard;
//# sourceMappingURL=auth.wechat.js.map