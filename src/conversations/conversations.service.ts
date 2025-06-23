import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { IConversationsService } from './conversations';
import { Conversation, Message, User } from 'src/utils/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { buildIndex } from '../utils/helpers';
import { HttpStatusCode } from 'axios';
import { apiResponse, databaseConfig, miniConversation } from "../utils/types";
import { Services } from '../utils/constants';
import { IMessagesService } from '../messages/messages';
import { ITokensService } from '../tokens/tokens';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.MESSAGES)
    private readonly messagesService: IMessagesService,
    @Inject(Services.TOKENS)
    private readonly tokensService: ITokensService,
  ) {}

  getConversationMessages(conversation: Conversation): Promise<Message[]> {
    try {
      return this.messagesService.getAllMessagesForOneConversation(
        conversation,
      );
    } catch (error) {}
  }

  async getAllConversationsForOneUser(user: User) {
    try {
      const conversations = await this.conversationRepository.find({
        where: { user: user },
      });
      return conversations.map(({ token, user, ...rest }) => rest);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatusCode.InternalServerError);
    }
  }

  async getConversationById(id: number): Promise<Conversation> {
    try {
      return await this.conversationRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatusCode.InternalServerError);
    }
  }

  async createConversation(
    files: Express.Multer.File[],
    urls: string[],
    user: User,
    conversationName: string,
    database_config:databaseConfig
  ): Promise<miniConversation> {
    try {
      const data = await buildIndex(files, urls,database_config);
      await this.tokensService.addTokens(data.tokens, user);
      const conversation = this.conversationRepository.create({
        token: data.index_id,
        user,
        conversationName,
      });

      const allConversation =
        await this.conversationRepository.save(conversation);
      return {
        conversationName: allConversation.conversationName,
        id: allConversation.id,
        tokens: data.tokens,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatusCode.BadGateway);
    }
  }

  async createApi(
    files: Express.Multer.File[],
    urls: string[],
    database_config:databaseConfig
  ):Promise<apiResponse>{
    try {
      const data = await buildIndex(files, urls,database_config);
      return {
        apiToken: data.index_id,
        tokens: data.tokens,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatusCode.BadGateway);
    }
  }
}
