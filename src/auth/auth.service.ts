import { HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUsersService } from '../users/users';
import { Services } from '../utils/constants';
import { loginPayload, signupPayload } from '../utils/types';
import { HttpStatusCode } from 'axios';
import { compareHash } from '../utils/helpers';
import { User } from "../utils/typeorm";
import { IAuthService } from "./auth";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class AuthService implements IAuthService{
  constructor(
    @Inject(Services.USERS) private readonly usersService: IUsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(payload: signupPayload) {
    const check = await this.usersService.findByEmail(payload.email);
    if (check) {
      throw new HttpException('user is already found', 400);
    }
    const user = await this.usersService.createUser(payload);
    const token = this.createToken(user);
    return {
      data: instanceToPlain(user),
      token: token,
    };
  }

  async login(payload: loginPayload) {
    const user = await this.usersService.findByEmail(payload.email);
    if (!user) {
      throw new HttpException('Incorrect email', HttpStatusCode.Unauthorized);
    }
    if (!(await compareHash(payload.password, user.password))) {
      throw new HttpException('Incorrect password', HttpStatusCode.Unauthorized);
    }
    const token = this.createToken(user);
    return {
      data: instanceToPlain(user),
      token: token,
    };
  }

  private createToken(user: User) {
    return this.jwtService.sign(
      { user: user },
      {
        secret: process.env.JWT_SECRET,
      },
    );
  }
}
