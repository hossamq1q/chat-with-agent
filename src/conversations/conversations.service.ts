import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { IConversationsService } from './conversations';
import { Conversation, Message, User } from 'src/utils/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { buildIndex } from '../utils/helpers';
import { HttpStatusCode } from 'axios';
import { miniConversation } from '../utils/types';
import { Services } from '../utils/constants';
import { IMessagesService } from '../messages/messages';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.MESSAGES)
    private readonly messagesService: IMessagesService,
  ) {}

  getConversationMessages(conversation: Conversation): Promise<Message[]> {
    try{
      return this.messagesService.getAllMessagesForOneConversation(conversation)
    }catch(error){}
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
  ): Promise<miniConversation> {
    try {
      const data = await buildIndex(files, urls);

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
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatusCode.BadGateway);
    }
  }
}
