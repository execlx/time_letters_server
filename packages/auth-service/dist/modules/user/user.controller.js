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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./dto/user-dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const swagger_1 = require("@nestjs/swagger");
const business_exception_1 = require("../../common/exceptions/business.exception");
const errorcode_constant_1 = require("../../common/constants/errorcode.constant");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto) {
        try {
            return await this.userService.create(createUserDto);
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('创建用户失败', errorcode_constant_1.ErrorCode.SYSTEM_ERROR);
        }
    }
    async createByPhone(registerDto) {
        try {
            return await this.userService.createByPhone(registerDto);
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('创建用户失败', errorcode_constant_1.ErrorCode.SYSTEM_ERROR);
        }
    }
    async createByEmail(registerDto) {
        try {
            return await this.userService.createByEmail(registerDto);
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('创建用户失败', errorcode_constant_1.ErrorCode.SYSTEM_ERROR);
        }
    }
    async createByWechat(registerDto) {
        try {
            return await this.userService.createByWechat(registerDto);
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('创建用户失败', errorcode_constant_1.ErrorCode.SYSTEM_ERROR);
        }
    }
    async setPassword(setPasswordDto) {
        try {
            await this.userService.setPassword(setPasswordDto.userId, setPasswordDto.password);
            return { message: '密码设置成功' };
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('设置密码失败', errorcode_constant_1.ErrorCode.SYSTEM_ERROR);
        }
    }
    async resetPassword(resetPasswordDto) {
        try {
            await this.userService.resetPassword(resetPasswordDto.phone, resetPasswordDto.password);
            return { message: '密码重置成功' };
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('密码重置失败', errorcode_constant_1.ErrorCode.SYSTEM_ERROR);
        }
    }
    async update(id, updateUserDto) {
        try {
            return await this.userService.update(id, updateUserDto);
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('更新用户信息失败', errorcode_constant_1.ErrorCode.SYSTEM_ERROR);
        }
    }
    async findOne(id) {
        try {
            const user = await this.userService.findById(Number(id));
            if (!user) {
                throw new business_exception_1.BusinessException('用户不存在', errorcode_constant_1.ErrorCode.USER_NOT_FOUND);
            }
            return user;
        }
        catch (error) {
            if (error instanceof business_exception_1.BusinessException) {
                throw error;
            }
            throw new business_exception_1.BusinessException('获取用户信息失败', errorcode_constant_1.ErrorCode.SYSTEM_ERROR);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '创建用户' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '用户创建成功' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '创建用户失败' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '通过手机号创建用户' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '用户创建成功' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '创建用户失败' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('phone'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.PhoneRegisterDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createByPhone", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '通过邮箱创建用户' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '用户创建成功' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '创建用户失败' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.EmailRegisterDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createByEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '通过微信创建用户' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '用户创建成功' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '创建用户失败' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('wechat'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.WechatRegisterDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createByWechat", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '设置密码' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '密码设置成功' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '设置密码失败' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('password/set'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.SetPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setPassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '重置密码' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '密码重置成功' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '密码重置失败' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '更新用户信息' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '用户信息更新成功' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '更新用户信息失败' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '用户不存在' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取用户信息' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '获取用户信息成功' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '用户不存在' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('用户'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map