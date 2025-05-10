import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ArrayMinSize, ValidateNested, IsEnum, IsString, IsOptional, IsBoolean } from 'class-validator';

export class MessageDto {
  @ApiProperty({ enum: ['system', 'user', 'assistant'], description: '消息作者的角色' })
  @IsEnum(['system', 'user', 'assistant'])
  role: 'system' | 'user' | 'assistant';

  @ApiProperty({ description: '消息内容' })
  @IsString()
  content: string;
}

export class DeepseekChatDto {
  @ApiProperty({ type: [MessageDto], description: '聊天消息数组' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  messages: MessageDto[];

  @ApiProperty({ required: false, description: '用于聊天完成的模型，默认从配置中读取' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({ required: false, description: '是否以流式方式返回' })
  @IsOptional()
  @IsBoolean()
  stream?: boolean;
} 