import { Message, User } from "./typeorm";

export type signupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type loginPayload = {
  email: string;
  password: string;
};

export type outputSignupAndLogin = {
  data: any;
  token: string;
};

export type ResponseBuildIndex = {
  status: string;
  index_id: string;
  message: string;
};

export type miniConversation = {
  conversationName: string;
  id: number;
};

export type queryPayload ={
  indexId:string,
  query:string
}

export type messageResponse = {
  question:Message,
  response:Message
}
