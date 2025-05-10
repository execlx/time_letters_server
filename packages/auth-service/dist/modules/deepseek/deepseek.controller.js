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
exports.DeepseekController = void 0;
const common_1 = require("@nestjs/common");
const deepseek_service_js_1 = require("./deepseek.service.js");
const deepseek_chat_dto_js_1 = require("./dto/deepseek-chat.dto.js");
const swagger_1 = require("@nestjs/swagger");
let DeepseekController = class DeepseekController {
    deepseekService;
    constructor(deepseekService) {
        this.deepseekService = deepseekService;
    }
    async chat(body) {
        return this.deepseekService.chatCompletion(body.messages, {
            model: body.model,
            stream: body.stream,
        });
    }
};
exports.DeepseekController = DeepseekController;
__decorate([
    (0, common_1.Post)('chat'),
    (0, swagger_1.ApiOperation)({ summary: '深度搜索聊天' }),
    (0, swagger_1.ApiBody)({ type: deepseek_chat_dto_js_1.DeepseekChatDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '聊天完成返回', schema: { type: 'object' } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deepseek_chat_dto_js_1.DeepseekChatDto]),
    __metadata("design:returntype", Promise)
], DeepseekController.prototype, "chat", null);
exports.DeepseekController = DeepseekController = __decorate([
    (0, swagger_1.ApiTags)('deepseek'),
    (0, common_1.Controller)('deepseek'),
    __metadata("design:paramtypes", [deepseek_service_js_1.DeepseekService])
], DeepseekController);
//# sourceMappingURL=deepseek.controller.js.map