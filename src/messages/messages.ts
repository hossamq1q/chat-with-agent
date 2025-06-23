import { Conversation, Message, User } from "../utils/typeorm";
import { apiParams } from "../utils/types";

export interface IMessagesService{
  sendMessage(conversation:Conversation , content:string , user:User):Promise<any>
  getAllMessagesForOneConversation(conversation:Conversation)
  useApi(params:apiParams)
}