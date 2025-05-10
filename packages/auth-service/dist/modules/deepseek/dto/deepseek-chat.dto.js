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
exports.DeepseekChatDto = exports.MessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class MessageDto {
    role;
    content;
}
exports.MessageDto = MessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['system', 'user', 'assistant'], description: '消息作者的角色' }),
    (0, class_validator_1.IsEnum)(['system', 'user', 'assistant']),
    __metadata("design:type", String)
], MessageDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '消息内容' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MessageDto.prototype, "content", void 0);
class DeepseekChatDto {
    messages;
    model;
    stream;
}
exports.DeepseekChatDto = DeepseekChatDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MessageDto], description: '聊天消息数组' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MessageDto),
    __metadata("design:type", Array)
], DeepseekChatDto.prototype, "messages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '用于聊天完成的模型，默认从配置中读取' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeepseekChatDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '是否以流式方式返回' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeepseekChatDto.prototype, "stream", void 0);
//# sourceMappingURL=deepseek-chat.dto.js.map