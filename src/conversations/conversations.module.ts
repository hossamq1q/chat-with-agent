import { forwardRef, Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { Services } from '../utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from '../utils/typeorm';
import { UsersModule } from '../users/users.module';
import { MessagesModule } from '../messages/messages.module';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [
    TokensModule,
    UsersModule,
    forwardRef(() => MessagesModule),
    TypeOrmModule.forFeature([Conversation]),
  ],
  controllers: [ConversationsController],
  providers: [
    { provide: Services.CONVERSATIONS, useClass: ConversationsService },
  ],
  exports: [Services.CONVERSATIONS],
})
export class ConversationsModule {}
