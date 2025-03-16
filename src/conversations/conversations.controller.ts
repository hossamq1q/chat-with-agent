import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Routes, Services } from '../utils/constants';
import { IConversationsService } from './conversations';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthUser, GetConversation } from '../utils/decorators';
import { Conversation, User } from '../utils/typeorm';
import { AuthGuard } from '../auth/guards/auth.guard';
import { multerOptions } from '../utils/multerConfigration';
import { CreateConversationDto } from './dto/creatConversation.dto';
import { ValidateConversationGuard } from '../auth/guards/validateConversation.guard';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
  async createConversation(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateConversationDto,
    @AuthUser() user: User,
  ) {
    return await this.conversationsService.createConversation(
      files,
      body.urls,
      user,
      body.conversationName,
    );
  }

  @Get()
  async getAllConversationsForOneUser(@AuthUser() user: User) {
    return await this.conversationsService.getAllConversationsForOneUser(user);
  }

  @Get(':conversationId')
  @UseGuards(ValidateConversationGuard)
  async getConversationMessages(@GetConversation() conversation: Conversation) {
    return this.conversationsService.getConversationMessages(conversation);
  }
}
