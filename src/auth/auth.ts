import { loginPayload, outputSignupAndLogin, signupPayload } from "../utils/types";

export interface IAuthService{
  signUp(payload: signupPayload):Promise<outputSignupAndLogin>
  login(payload: loginPayload):Promise<outputSignupAndLogin>
}