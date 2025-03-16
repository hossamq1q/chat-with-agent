import { User } from "../utils/typeorm";
import { signupPayload } from "../utils/types";

export interface IUsersService{
  findByEmail(email: string): Promise<User | undefined>;
  createUser(payload:signupPayload): Promise<User>;
}