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
var DeepseekService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepseekService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = require("openai");
const logger_service_js_1 = require("../logger/logger.service.js");
const business_exception_js_1 = require("../../common/exceptions/business.exception.js");
const errorcode_constant_js_1 = require("../../common/constants/errorcode.constant.js");
const common_2 = require("@nestjs/common");
let DeepseekService = DeepseekService_1 = class DeepseekService {
    configService;
    logger;
    client;
    constructor(configService, logger) {
        this.configService = configService;
        this.logger = logger;
        this.client = new openai_1.default({
            apiKey: this.configService.get('deepseek.apiKey'),
            baseURL: this.configService.get('deepseek.apiBaseUrl'),
        });
        this.logger.setContext(DeepseekService_1.name);
    }
    async chatCompletion(messages, options) {
        if (!messages || messages.length === 0) {
            this.logger.error('聊天消息数组不能为空');
            throw new business_exception_js_1.BusinessException('聊天消息数组不能为空', errorcode_constant_js_1.ErrorCode.INVALID_PARAMS);
        }
        const model = options?.model ?? this.configService.get('deepseek.model');
        this.logger.log(`请求Deepseek聊天，model=${model}，messages=${JSON.stringify(messages)}`);
        try {
            const result = await this.client.chat.completions.create({
                model,
                messages,
                stream: options?.stream ?? false,
            });
            this.logger.log('Deepseek聊天返回成功');
            return result;
        }
        catch (error) {
            const detail = error.response?.data ?? error;
            this.logger.error(`Deepseek调用失败: ${JSON.stringify(detail)}`, error.stack);
            throw new business_exception_js_1.BusinessException(`Deepseek调用失败: ${error.message}`, errorcode_constant_js_1.ErrorCode.SYSTEM_ERROR, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.DeepseekService = DeepseekService;
exports.DeepseekService = DeepseekService = DeepseekService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        logger_service_js_1.LoggerService])
], DeepseekService);
//# sourceMappingURL=deepseek.service.js.map