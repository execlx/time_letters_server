"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./configuration");
let AppConfigModule = class AppConfigModule {
};
exports.AppConfigModule = AppConfigModule;
exports.AppConfigModule = AppConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                isGlobal: true,
            }),
        ],
        providers: [{
                provide: 'CONFIG_OPTIONS',
                useFactory: (config) => {
                    return (0, configuration_1.default)();
                },
                inject: [config_1.ConfigService],
            }, {
                provide: 'JWT_CONFIG',
                useFactory: (config) => {
                    return {
                        secret: config.jwt.secret,
                        expiresIn: config.jwt.expiresIn,
                    };
                },
                inject: ['CONFIG_OPTIONS'],
            },
            {
                provide: 'DATABASE_CONFIG',
                useFactory: (config) => {
                    return {
                        host: config.database.host,
                        port: config.database.port,
                        username: config.database.username,
                        password: config.database.password,
                        database: config.database.database,
                    };
                },
                inject: ['CONFIG_OPTIONS'],
            },
        ],
        exports: ['JWT_CONFIG', 'DATABASE_CONFIG']
    })
], AppConfigModule);
//# sourceMappingURL=config.module.js.map