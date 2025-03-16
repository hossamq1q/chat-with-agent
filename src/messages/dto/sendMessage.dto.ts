import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  content: string;
}