"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuth = exports.WechatAuth = exports.PhoneAuth = exports.LocalAuth = exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const auth_constants_1 = require("../constants/auth.constants");
const Auth = (strategy) => (0, common_1.SetMetadata)('authStrategy', strategy);
exports.Auth = Auth;
const LocalAuth = () => (0, exports.Auth)(auth_constants_1.AUTH_STRATEGY.LOCAL);
exports.LocalAuth = LocalAuth;
const PhoneAuth = () => (0, exports.Auth)(auth_constants_1.AUTH_STRATEGY.PHONE);
exports.PhoneAuth = PhoneAuth;
const WechatAuth = () => (0, exports.Auth)(auth_constants_1.AUTH_STRATEGY.WECHAT);
exports.WechatAuth = WechatAuth;
const JwtAuth = () => (0, exports.Auth)(auth_constants_1.AUTH_STRATEGY.JWT);
exports.JwtAuth = JwtAuth;
//# sourceMappingURL=auth.decorator.js.map