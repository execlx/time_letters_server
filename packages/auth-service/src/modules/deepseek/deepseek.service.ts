import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { LoggerService } from '../logger/logger.service.js';
import { BusinessException } from '../../common/exceptions/business.exception.js';
import { ErrorCode } from '../../common/constants/errorcode.constant.js';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class DeepseekService {
  private readonly client: OpenAI;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('deepseek.apiKey'),
      baseURL: this.configService.get<string>('deepseek.apiBaseUrl'),
    });
    this.logger.setContext(DeepseekService.name);
  }

  async chatCompletion(
    messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
    options?: { model?: string; stream?: boolean },
  ) {
    if (!messages || messages.length === 0) {
      this.logger.error('聊天消息数组不能为空');
      throw new BusinessException('聊天消息数组不能为空', ErrorCode.INVALID_PARAMS);
    }
    const model = options?.model ?? this.configService.get<string>('deepseek.model')!;
    this.logger.log(`请求Deepseek聊天，model=${model}，messages=${JSON.stringify(messages)}`);
    try {
      const result = await this.client.chat.completions.create({
        model,
        messages,
        stream: options?.stream ?? false,
      });
      this.logger.log('Deepseek聊天返回成功');
      return result;
    } catch (error: any) {
      // 记录 OpenAI/Deepseek 返回的完整错误详情
      const detail = error.response?.data ?? error;
      this.logger.error(`Deepseek调用失败: ${JSON.stringify(detail)}`, error.stack);
      throw new BusinessException(
        `Deepseek调用失败: ${error.message}`,
        ErrorCode.SYSTEM_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 