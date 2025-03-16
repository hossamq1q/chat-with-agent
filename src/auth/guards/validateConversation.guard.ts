import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Services } from '../../utils/constants';
import { IConversationsService } from '../../conversations/conversations';

export class ValidateConversationGuard implements CanActivate {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const conversationId: number = request.params.conversationId;
    if (!conversationId) {
      throw new HttpException(
        'conversationId not provided',
        HttpStatusCode.BadRequest,
      );
    }
    const user = request.user;
    const conversation =
      await this.conversationsService.getConversationById(conversationId);
    if (!conversation) {
      throw new HttpException(
        'conversation not found',
        HttpStatusCode.BadRequest,
      );
    }
    request['conversation'] = conversation;
    return conversation.user.id === user.id;
  }
}
