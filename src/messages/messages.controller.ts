import { Body, Controller, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { Routes, Services } from '../utils/constants';
import { IMessagesService } from './messages';
import { ValidateConversationGuard } from "../auth/guards/validateConversation.guard";
import { SendMessageDto } from "./dto/sendMessage.dto";
import { AuthUser, GetConversation } from "../utils/decorators";
import { Conversation, User } from "../utils/typeorm";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller(Routes.MESSAGES)
@UseGuards(AuthGuard)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGES) private messagesService: IMessagesService,
  ) {}

  @Post(':conversationId')
  @UseGuards(ValidateConversationGuard)
  async createMessage(
    @GetConversation()conversation:Conversation,
    @Body() payload: SendMessageDto,
    @AuthUser()user:User
  ) {
    return this.messagesService.sendMessage(conversation , payload.content , user)
  }
}
