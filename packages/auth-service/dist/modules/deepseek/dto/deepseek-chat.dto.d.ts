export declare class MessageDto {
    role: 'system' | 'user' | 'assistant';
    content: string;
}
export declare class DeepseekChatDto {
    messages: MessageDto[];
    model?: string;
    stream?: boolean;
}
