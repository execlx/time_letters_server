import { Controller, Post, Body } from '@nestjs/common';
import { DeepseekService } from './deepseek.service.js';
import { DeepseekChatDto } from './dto/deepseek-chat.dto.js';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('deepseek')
@Controller('deepseek')
export class DeepseekController {
  constructor(private readonly deepseekService: DeepseekService) {}

  @Post('chat')
  @ApiOperation({ summary: '深度搜索聊天' })
  @ApiBody({ type: DeepseekChatDto })
  @ApiResponse({ status: 201, description: '聊天完成返回', schema: { type: 'object' } })
  async chat(@Body() body: DeepseekChatDto) {
    return this.deepseekService.chatCompletion(body.messages, {
      model: body.model,
      stream: body.stream,
    });
  }
} 