import { forwardRef, Module } from "@nestjs/common";
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Services } from '../utils/constants';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "../utils/typeorm";
import { ConversationsModule } from "../conversations/conversations.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports:[forwardRef(() => ConversationsModule),UsersModule,TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [{ provide: Services.MESSAGES, useClass: MessagesService }],
  exports:[Services.MESSAGES]
})
export class MessagesModule {}
