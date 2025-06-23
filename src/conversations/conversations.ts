import { Conversation, Message, User } from "../utils/typeorm";
import { apiResponse, databaseConfig, miniAllConversation, miniConversation } from "../utils/types";

export interface IConversationsService {
  createConversation(
    files: Express.Multer.File[],
    urls: string[],
    user:User,
    conversationName: string,
    database_config:databaseConfig
  ): Promise<miniConversation>;

  createApi(
    files: Express.Multer.File[],
    urls: string[],
    database_config:databaseConfig
  ): Promise<apiResponse>;

  getConversationById(id:number): Promise<Conversation>;

  getAllConversationsForOneUser(user:User):Promise<miniAllConversation[]>

  getConversationMessages(conversation:Conversation):Promise<Message[]>
}
