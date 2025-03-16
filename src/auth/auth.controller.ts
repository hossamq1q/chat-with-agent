import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth';
import { AuthGuard } from './guards/auth.guard';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
  ) {}

  @Post('signUp')
  async signUp(@Body() body: SignupDto) {
    try {
      return await this.authService.signUp(body);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      return await this.authService.login(body);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  getStatus(@Req() req: Request) {
    return req['user'];
  }
}
