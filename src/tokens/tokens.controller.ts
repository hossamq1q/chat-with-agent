import { Controller, Get, HttpException, Inject, UseGuards } from "@nestjs/common";
import { Routes, Services } from '../utils/constants';
import { ITokensService } from './tokens';
import { AuthUser } from '../utils/decorators';
import { User } from '../utils/typeorm';
import { HttpStatusCode } from 'axios';
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller(Routes.TOKENS)
@UseGuards(AuthGuard)
export class TokensController {
  constructor(
    @Inject(Services.TOKENS) private readonly tokensService: ITokensService,
  ) {}

  @Get()
  async getWeeklyUsage(@AuthUser() user: User) {
    try {
      return this.tokensService.getUserWeeklyUsage(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatusCode.BadGateway);
    }
  }
}
