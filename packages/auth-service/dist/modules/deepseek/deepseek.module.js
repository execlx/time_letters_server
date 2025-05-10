"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepseekModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const deepseek_service_js_1 = require("./deepseek.service.js");
const deepseek_controller_js_1 = require("./deepseek.controller.js");
let DeepseekModule = class DeepseekModule {
};
exports.DeepseekModule = DeepseekModule;
exports.DeepseekModule = DeepseekModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        controllers: [deepseek_controller_js_1.DeepseekController],
        providers: [deepseek_service_js_1.DeepseekService],
        exports: [deepseek_service_js_1.DeepseekService],
    })
], DeepseekModule);
//# sourceMappingURL=deepseek.module.js.map