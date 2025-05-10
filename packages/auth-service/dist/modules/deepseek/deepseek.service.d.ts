import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { LoggerService } from '../logger/logger.service.js';
export declare class DeepseekService {
    private readonly configService;
    private readonly logger;
    private readonly client;
    constructor(configService: ConfigService, logger: LoggerService);
    chatCompletion(messages: {
        role: 'system' | 'user' | 'assistant';
        content: string;
    }[], options?: {
        model?: string;
        stream?: boolean;
    }): Promise<(import("openai/streaming.js").Stream<OpenAI.Chat.Completions.ChatCompletionChunk> & {
        _request_id?: string | null;
    }) | (OpenAI.Chat.Completions.ChatCompletion & {
        _request_id?: string | null;
    })>;
}
