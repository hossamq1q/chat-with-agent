import { Conversation, Message, User } from "../utils/typeorm";

export interface IMessagesService{
  sendMessage(conversation:Conversation , content:string , user:User):Promise<any>
  getAllMessagesForOneConversation(conversation:Conversation)
}