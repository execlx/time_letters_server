"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const user_entity_1 = require("../user/entities/user.entity");
const auth_jwt_1 = require("./local/auth.jwt");
const auth_local_1 = require("./local/auth.local");
const auth_phone_1 = require("./local/auth.phone");
const auth_wechat_1 = require("./local/auth.wechat");
const auth_email_1 = require("./local/auth.email");
const email_module_1 = require("./email/email.module");
const phone_module_1 = require("./phone/phone.module");
const user_module_1 = require("../user/user.module");
const auth_email_2 = require("./local/auth.email");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('jwt.secret'),
                    signOptions: { expiresIn: configService.get('jwt.expiresIn') },
                }),
                inject: [config_1.ConfigService],
            }),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            email_module_1.EmailModule,
            phone_module_1.PhoneModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            {
                provide: 'JWT_CONFIG',
                useFactory: (configService) => ({
                    secret: configService.get('jwt.secret'),
                    expiresIn: configService.get('jwt.expiresIn'),
                }),
                inject: [config_1.ConfigService],
            },
            auth_jwt_1.JwtStrategy,
            auth_local_1.LocalStrategy,
            auth_phone_1.PhoneStrategy,
            auth_wechat_1.WechatStrategy,
            auth_email_1.EmailStrategy,
            auth_email_2.EmailAuthGuard,
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map