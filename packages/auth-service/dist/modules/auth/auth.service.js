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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("./constants/auth.constants");
const user_service_1 = require("../user/user.service");
const phone_service_1 = require("./phone/phone.service");
const business_exception_1 = require("../../common/exceptions/business.exception");
const errorcode_constant_1 = require("../../common/constants/errorcode.constant");
const bcrypt = require("bcryptjs");
const email_service_1 = require("./email/email.service");
const logger_service_1 = require("../logger/logger.service");
let AuthService = class AuthService {
    jwtService;
    userService;
    phoneService;
    emailService;
    logger;
    constructor(jwtService, userService, phoneService, emailService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.phoneService = phoneService;
        this.emailService = emailService;
        this.logger = new logger_service_1.LoggerService();
        this.logger.setContext('认证服务');
    }
    async validateUserByUsernamePassword(username, password) {
        this.logger.debug(`开始验证用户名密码登录: ${username}`, 'validateUserByUsernamePassword');
        if (!username || !password) {
            this.logger.warn(`用户名或密码为空: ${username}`, 'validateUserByUsernamePassword');
            throw new business_exception_1.BusinessException('用户名和密码不能为空', errorcode_constant_1.ErrorCode.INVALID_CREDENTIALS);
        }
        if (password.length < 6) {
            this.logger.warn(`密码长度不足: ${username}`, 'validateUserByUsernamePassword');
            throw new business_exception_1.BusinessException('密码长度不能少于6位', errorcode_constant_1.ErrorCode.INVALID_CREDENTIALS);
        }
        const user = await this.userService.validateUser(username, password);
        if (!user) {
            this.logger.warn(`用户名或密码错误: ${username}`, 'validateUserByUsernamePassword');
            throw new business_exception_1.BusinessException('用户名或密码错误', errorcode_constant_1.ErrorCode.INVALID_CREDENTIALS);
        }
        if (user.status !== 'active') {
            this.logger.warn(`用户状态异常: ${username}`, 'validateUserByUsernamePassword');
            throw new business_exception_1.BusinessException('用户状态异常', errorcode_constant_1.ErrorCode.USER_STATUS_ERROR);
        }
        this.logger.log(`用户名密码登录成功: ${username}`, 'validateUserByUsernamePassword');
        return user;
    }
    async validateUserByPhonePassword(phone, password) {
        this.logger.debug(`开始验证手机号密码登录: ${phone}`, 'validateUserByPhonePassword');
        const user = await this.userService.findByPhone(phone);
        if (!user) {
            this.logger.warn(`用户不存在: ${phone}`, 'validateUserByPhonePassword');
            throw new business_exception_1.BusinessException('用户不存在', errorcode_constant_1.ErrorCode.USER_NOT_FOUND);
        }
        if (!user.password) {
            this.logger.warn(`手机号未设置密码: ${phone}`, 'validateUserByPhonePassword');
            throw new business_exception_1.BusinessException('该手机号未设置密码', errorcode_constant_1.ErrorCode.PASSWORD_ERROR);
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            this.logger.warn(`密码错误: ${phone}`, 'validateUserByPhonePassword');
            throw new business_exception_1.BusinessException('密码错误', errorcode_constant_1.ErrorCode.PASSWORD_ERROR);
        }
        this.logger.log(`手机号密码登录成功: ${phone}`, 'validateUserByPhonePassword');
        return user;
    }
    async validateUserByWechat(code) {
        this.logger.debug('开始验证微信登录', 'validateUserByWechat');
        const openid = 'mock_openid';
        const user = await this.userService.findByWechat(openid);
        if (!user) {
            this.logger.warn(`微信用户不存在: ${openid}`, 'validateUserByWechat');
            throw new business_exception_1.BusinessException('微信用户不存在', errorcode_constant_1.ErrorCode.WECHAT_USER_NOT_FOUND);
        }
        this.logger.log(`微信登录成功: ${openid}`, 'validateUserByWechat');
        return user;
    }
    async validateUserByPhone(phone, code) {
        this.logger.debug(`开始验证手机验证码登录: ${phone}`, 'validateUserByPhone');
        const user = await this.userService.findByPhone(phone);
        if (!user) {
            this.logger.warn(`用户不存在: ${phone}`, 'validateUserByPhone');
            throw new business_exception_1.BusinessException('用户不存在', errorcode_constant_1.ErrorCode.USER_NOT_FOUND);
        }
        this.logger.log(`手机验证码登录成功: ${phone}`, 'validateUserByPhone');
        return user;
    }
    async validateUserByEmail(email, code) {
        const isValid = await this.emailService.validateVerificationCode(email, code);
        if (!isValid) {
            throw new business_exception_1.BusinessException('验证码无效或已过期', errorcode_constant_1.ErrorCode.INVALID_EMAIL_VERIFICATION_CODE);
        }
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new business_exception_1.BusinessException('用户不存在', errorcode_constant_1.ErrorCode.USER_NOT_FOUND);
        }
        return user;
    }
    async validateRequest(request, strategy) {
        switch (strategy) {
            case auth_constants_1.AUTH_STRATEGY.LOCAL:
                return this.validateLocal(request);
            case auth_constants_1.AUTH_STRATEGY.PHONE:
                return this.validatePhone(request);
            case auth_constants_1.AUTH_STRATEGY.JWT:
                return this.validateJwt(request);
            default:
                throw new business_exception_1.BusinessException('Invalid authentication strategy', errorcode_constant_1.ErrorCode.INVALID_AUTH_STRATEGY);
        }
    }
    async validateLocal(request) {
        const { username, password } = request.body;
        const user = await this.userService.validateUser(username, password);
        if (!user) {
            throw new business_exception_1.BusinessException('Invalid credentials', errorcode_constant_1.ErrorCode.INVALID_CREDENTIALS);
        }
        request.user = user;
        return true;
    }
    async validatePhone(request) {
        const { phone, code } = request.body;
        const isValid = await this.phoneService.validateVerificationCode(phone, code);
        if (!isValid) {
            throw new business_exception_1.BusinessException('Invalid phone verification code', errorcode_constant_1.ErrorCode.INVALID_PHONE_VERIFICATION_CODE);
        }
        const user = await this.userService.findByPhone(phone);
        if (!user) {
            throw new business_exception_1.BusinessException('User not found', errorcode_constant_1.ErrorCode.USER_NOT_FOUND);
        }
        request.user = user;
        return true;
    }
    async validateJwt(request) {
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new business_exception_1.BusinessException('No token provided', errorcode_constant_1.ErrorCode.NO_TOKEN_PROVIDED);
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            const user = await this.userService.findById(payload.sub);
            if (!user) {
                throw new business_exception_1.BusinessException('User not found', errorcode_constant_1.ErrorCode.USER_NOT_FOUND);
            }
            request.user = user;
            return true;
        }
        catch {
            throw new business_exception_1.BusinessException('Invalid token', errorcode_constant_1.ErrorCode.INVALID_TOKEN);
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    async generateToken(user) {
        this.logger.debug(`开始生成用户令牌: ${user.id}`, 'generateToken');
        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
        };
        const token = {
            access_token: this.jwtService.sign(payload),
        };
        this.logger.log(`用户令牌生成成功: ${user.id}`, 'generateToken');
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        phone_service_1.PhoneService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map