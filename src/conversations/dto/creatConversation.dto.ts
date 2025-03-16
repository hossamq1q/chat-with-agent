import { IsString, IsArray, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConversationDto {
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @IsOptional()
  urls: string[];

  @IsString()
  @IsNotEmpty()
  conversationName: string;
}