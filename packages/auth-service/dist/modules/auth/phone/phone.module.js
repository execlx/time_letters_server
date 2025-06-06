"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const phone_service_1 = require("./phone.service");
const phone_controller_1 = require("./phone.controller");
const phone_verification_entity_1 = require("./entities/phone-verification.entity");
let PhoneModule = class PhoneModule {
};
exports.PhoneModule = PhoneModule;
exports.PhoneModule = PhoneModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([phone_verification_entity_1.PhoneVerification])],
        controllers: [phone_controller_1.PhoneController],
        providers: [phone_service_1.PhoneService],
        exports: [phone_service_1.PhoneService],
    })
], PhoneModule);
//# sourceMappingURL=phone.module.js.map