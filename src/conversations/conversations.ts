import { Conversation, Message, User } from "../utils/typeorm";
import { miniConversation } from "../utils/types";

export interface IConversationsService {
  createConversation(
    files: Express.Multer.File[],
    urls: string[],
    user:User,
    conversationName: string
  ): Promise<miniConversation>;

  getConversationById(id:number): Promise<Conversation>;

  getAllConversationsForOneUser(user:User):Promise<miniConversation[]>

  getConversationMessages(conversation:Conversation):Promise<Message[]>
}
