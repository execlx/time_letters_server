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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcryptjs");
const business_exception_1 = require("../../common/exceptions/business.exception");
const errorcode_constant_1 = require("../../common/constants/errorcode.constant");
const logger_service_1 = require("../logger/logger.service");
const phone_service_1 = require("../auth/phone/phone.service");
const email_service_1 = require("../auth/email/email.service");
const user_entity_2 = require("./entities/user.entity");
let UserService = class UserService {
    userRepository;
    phoneService;
    emailService;
    logger;
    constructor(userRepository, phoneService, emailService) {
        this.userRepository = userRepository;
        this.phoneService = phoneService;
        this.emailService = emailService;
        this.logger = new logger_service_1.LoggerService();
        this.logger.setContext('用户服务');
    }
    async validateUser(username, password) {
        this.logger.debug(`开始验证用户: ${username}`, 'validateUser');
        const user = await this.userRepository.findOne({ where: { username } });
        if (user && user.password && await bcrypt.compare(password, user.password)) {
            this.logger.log(`用户验证成功: ${username}`, 'validateUser');
            return user;
        }
        this.logger.warn(`用户验证失败: ${username}`, 'validateUser');
        return null;
    }
    async findById(id) {
        this.logger.debug(`开始查询用户: ${id}`, 'findById');
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            this.logger.warn(`用户不存在: ${id}`, 'findById');
        }
        else {
            this.logger.log(`用户查询成功: ${id}`, 'findById');
        }
        return user;
    }
    async findByPhone(phone) {
        this.logger.debug(`开始查询手机号用户: ${phone}`, 'findByPhone');
        const user = await this.userRepository.findOne({ where: { phone } });
        if (!user) {
            this.logger.warn(`手机号用户不存在: ${phone}`, 'findByPhone');
        }
        else {
            this.logger.log(`手机号用户查询成功: ${phone}`, 'findByPhone');
        }
        return user;
    }
    async findByWechat(openid) {
        this.logger.debug(`开始查询微信用户: ${openid}`, 'findByWechat');
        const user = await this.userRepository.findOne({ where: { wechatOpenid: openid } });
        if (!user) {
            this.logger.warn(`微信用户不存在: ${openid}`, 'findByWechat');
        }
        else {
            this.logger.log(`微信用户查询成功: ${openid}`, 'findByWechat');
        }
        return user;
    }
    async findByEmail(email) {
        this.logger.debug(`开始查询邮箱用户: ${email}`, 'findByEmail');
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            this.logger.warn(`邮箱用户不存在: ${email}`, 'findByEmail');
        }
        else {
            this.logger.log(`邮箱用户查询成功: ${email}`, 'findByEmail');
        }
        return user;
    }
    async createUser(data) {
        this.logger.debug('开始创建用户', 'createUser');
        if (data.username) {
            const existingUser = await this.userRepository.findOne({ where: { username: data.username } });
            if (existingUser) {
                this.logger.warn(`用户名已存在: ${data.username}`, 'createUser');
                throw new business_exception_1.BusinessException('用户名已存在', errorcode_constant_1.ErrorCode.USER_EXISTS);
            }
        }
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const user = this.userRepository.create(data);
        const savedUser = await this.userRepository.save(user);
        this.logger.log(`用户创建成功: ${savedUser.id}`, 'createUser');
        return savedUser;
    }
    async create(data) {
        this.logger.debug('开始创建用户', 'create');
        if (data.username) {
            const existingUser = await this.userRepository.findOne({ where: { username: data.username } });
            if (existingUser) {
                this.logger.warn(`用户名已存在: ${data.username}`, 'create');
                throw new business_exception_1.BusinessException('用户名已存在', errorcode_constant_1.ErrorCode.USER_EXISTS);
            }
        }
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const user = this.userRepository.create(data);
        const savedUser = await this.userRepository.save(user);
        this.logger.log(`用户创建成功: ${savedUser.id}`, 'create');
        return savedUser;
    }
    async createByEmail(data) {
        this.logger.debug(`开始创建邮箱用户: ${data.email}`, 'createByEmail');
        try {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                this.logger.warn(`邮箱格式不正确: ${data.email}`, 'createByEmail');
                throw new business_exception_1.BusinessException('邮箱格式不正确', errorcode_constant_1.ErrorCode.INVALID_EMAIL);
            }
            await this.emailService.validateVerificationCode(data.email, data.code);
            const existingUser = await this.findByEmail(data.email);
            if (existingUser) {
                this.logger.warn(`邮箱已注册: ${data.email}`, 'createByEmail');
                throw new business_exception_1.BusinessException('邮箱已注册', errorcode_constant_1.ErrorCode.EMAIL_EXISTS);
            }
            if (data.username) {
                const existingUsername = await this.userRepository.findOne({ where: { username: data.username } });
                if (existingUsername) {
                    this.logger.warn(`用户名已存在: ${data.username}`, 'createByEmail');
                    throw new business_exception_1.BusinessException('用户名已存在', errorcode_constant_1.ErrorCode.USER_EXISTS);
                }
            }
            const username = data.username || `user_${data.email.split('@')[0]}_${Date.now().toString().slice(-4)}`;
            const userData = {
                email: data.email,
                username,
                status: user_entity_2.UserStatus.ACTIVE,
            };
            const user = this.userRepository.create(userData);
            const savedUser = await this.userRepository.save(user);
            this.logger.log(`邮箱用户创建成功: ${savedUser.id}`, 'createByEmail');
            return savedUser;
        }
        catch (error) {
            this.logger.error(`创建邮箱用户失败: ${error.message}`, error.stack, 'createByEmail');
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('创建用户失败', errorcode_constant_1.ErrorCode.SYSTEM_ERROR);
        }
    }
    async createByPhone(data) {
        this.logger.debug(`开始创建手机号用户: ${data.phone}`, 'createByPhone');
        try {
            if (!/^1[3-9]\d{9}$/.test(data.phone)) {
                this.logger.warn(`手机号格式不正确: ${data.phone}`, 'createByPhone');
                throw new business_exception_1.BusinessException('手机号格式不正确', errorcode_constant_1.ErrorCode.INVALID_PHONE);
            }
            const isValid = await this.phoneService.validateVerificationCode(data.phone, data.code);
            if (!isValid) {
                this.logger.warn(`手机验证码无效: ${data.phone}`, 'createByPhone');
                throw new business_exception_1.BusinessException('手机验证码无效', errorcode_constant_1.ErrorCode.INVALID_PHONE_VERIFICATION_CODE);
            }
            const existingUser = await this.findByPhone(data.phone);
            if (existingUser) {
                this.logger.warn(`手机号已注册: ${data.phone}`, 'createByPhone');
                throw new business_exception_1.BusinessException('手机号已注册', errorcode_constant_1.ErrorCode.PHONE_EXISTS);
            }
            if (data.username) {
                const existingUsername = await this.userRepository.findOne({ where: { username: data.username } });
                if (existingUsername) {
                    this.logger.warn(`用户名已存在: ${data.username}`, 'createByPhone');
                    throw new business_exception_1.BusinessException('用户名已存在', errorcode_constant_1.ErrorCode.USER_EXISTS);
                }
            }
            const username = data.username || `user_${data.phone.slice(-4)}_${Date.now().toString().slice(-4)}`;
            const userData = {
                phone: data.phone,
                username,
                status: user_entity_2.UserStatus.ACTIVE,
            };
            const user = this.userRepository.create(userData);
            const savedUser = await this.userRepository.save(user);
            this.logger.log(`手机号用户创建成功: ${savedUser.id}`, 'createByPhone');
            return savedUser;
        }
        catch (error) {
            this.logger.error(`创建手机号用户失败: ${error.message}`, error.stack, 'createByPhone');
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('创建用户失败', errorcode_constant_1.ErrorCode.SYSTEM_ERROR);
        }
    }
    async createByWechat(data) {
        this.logger.debug(`开始创建微信用户: ${data.wechatOpenid}`, 'createByWechat');
        const existingUser = await this.findByWechat(data.wechatOpenid);
        if (existingUser) {
            this.logger.warn(`微信用户已注册: ${data.wechatOpenid}`, 'createByWechat');
            throw new business_exception_1.BusinessException('微信用户已注册', errorcode_constant_1.ErrorCode.USER_EXISTS);
        }
        const user = this.userRepository.create(data);
        const savedUser = await this.userRepository.save(user);
        this.logger.log(`微信用户创建成功: ${savedUser.id}`, 'createByWechat');
        return savedUser;
    }
    async setPassword(userId, password) {
        this.logger.debug(`开始设置用户密码: ${userId}`, 'setPassword');
        const user = await this.findById(userId);
        if (!user) {
            this.logger.warn(`用户不存在: ${userId}`, 'setPassword');
            throw new business_exception_1.BusinessException('用户不存在', errorcode_constant_1.ErrorCode.USER_NOT_FOUND);
        }
        user.password = await bcrypt.hash(password, 10);
        await this.userRepository.save(user);
        this.logger.log(`用户密码设置成功: ${userId}`, 'setPassword');
    }
    async resetPassword(phone, password) {
        this.logger.debug(`开始重置用户密码: ${phone}`, 'resetPassword');
        const user = await this.findByPhone(phone);
        if (!user) {
            this.logger.warn(`用户不存在: ${phone}`, 'resetPassword');
            throw new business_exception_1.BusinessException('用户不存在', errorcode_constant_1.ErrorCode.USER_NOT_FOUND);
        }
        user.password = await bcrypt.hash(password, 10);
        await this.userRepository.save(user);
        this.logger.log(`用户密码重置成功: ${phone}`, 'resetPassword');
    }
    async update(id, data) {
        this.logger.debug(`开始更新用户信息: ${id}`, 'update');
        const user = await this.findById(id);
        if (!user) {
            this.logger.warn(`用户不存在: ${id}`, 'update');
            throw new business_exception_1.BusinessException('用户不存在', errorcode_constant_1.ErrorCode.USER_NOT_FOUND);
        }
        Object.assign(user, data);
        const updatedUser = await this.userRepository.save(user);
        this.logger.log(`用户信息更新成功: ${id}`, 'update');
        return updatedUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        phone_service_1.PhoneService,
        email_service_1.EmailService])
], UserService);
//# sourceMappingURL=user.service.js.map