import { DeepseekService } from './deepseek.service.js';
import { DeepseekChatDto } from './dto/deepseek-chat.dto.js';
export declare class DeepseekController {
    private readonly deepseekService;
    constructor(deepseekService: DeepseekService);
    chat(body: DeepseekChatDto): Promise<(import("openai/streaming.js").Stream<import("openai/resources/index.js").ChatCompletionChunk> & {
        _request_id?: string | null;
    }) | (import("openai/resources/index.js").ChatCompletion & {
        _request_id?: string | null;
    })>;
}
