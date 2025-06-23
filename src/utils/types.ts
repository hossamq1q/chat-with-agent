import { Message, User } from './typeorm';

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
  tokens: number;
};

export type miniConversation = {
  conversationName: string;
  id: number;
  tokens: number;
};

export type miniAllConversation = {
  conversationName: string;
  id: number;
};

export type queryPayload = {
  indexId: string;
  query: string;
};

export type messageResponse = {
  question: Message;
  response: Message;
};

export type usageGraph = {
  labels: string[];
  data: number[];
};

export type databaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  mysql_query: string;
};

export type apiResponse = {
  apiToken:string;
  tokens: number;
}

export type apiParams = {
  apiToken:string;
  content:string
}


