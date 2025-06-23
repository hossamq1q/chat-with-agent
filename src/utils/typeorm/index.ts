import { User } from './entities/User';
import { Conversation } from './entities/Conversation';
import { Message } from './entities/Message';
import { Token } from "./entities/Tokens";

const entities = [User, Conversation , Message , Token];

export { User, Conversation , Message , Token};

export default entities;
