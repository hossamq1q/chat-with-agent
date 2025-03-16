import { HttpException, Inject, Injectable } from '@nestjs/common';
import { IMessagesService } from './messages';
import { Conversation, Message, User } from 'src/utils/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatedBy, Services } from '../utils/constants';
import { IConversationsService } from '../conversations/conversations';
import { queryIndex } from '../utils/helpers';
import { HttpStatusCode } from 'axios';
import { messageResponse } from "../utils/types";

@Injectable()
export class MessagesService implements IMessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  async getAllMessagesForOneConversation(conversation: Conversation) {
    try {
      const messages =await this.messagesRepository.find({
        where: { conversation: conversation },
        order: { createdAt: 'ASC' }
      });
      const list:messageResponse[] = []
      for(let i = 0; i < messages.length; i+=2) {
        const object = {question:messages[i],response:messages[i+1]};
        list.push(object);
      }
      return list


    } catch (error) {
      throw new HttpException(`${error}`,HttpStatusCode.InternalServerError)
    }
  }

  async sendMessage(
    conversation: Conversation,
    content: string,
    user: User,
  ): Promise<any> {
    try {
      const response = await queryIndex({
        indexId: conversation.token,
        query: content,
      });
      await this.createMessage(conversation, content, CreatedBy.ME);
      const message = await this.createMessage(
        conversation,
        response.response,
        CreatedBy.AI,
      );
      return { response: message.content };
    } catch (error) {
      throw new HttpException(
        `Error creating message ${error}`,
        HttpStatusCode.InternalServerError,
      );
    }
  }

  private async createMessage(
    conversation: Conversation,
    content: string,
    createdBy: CreatedBy,
  ) {
    try {
      const message = this.messagesRepository.create({
        content,
        conversation,
        createdBy,
      });
      return await this.messagesRepository.save(message);
    } catch (error) {
      throw new HttpException(
        `Error creating message ${error}`,
        HttpStatusCode.InternalServerError,
      );
    }
  }
}
