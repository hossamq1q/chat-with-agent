import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../utils/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Services } from "../utils/constants";
import { ConversationsModule } from "../conversations/conversations.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
      global: true,
    }),
    UsersModule,
    ConversationsModule
  ],
  controllers: [AuthController],
  providers: [{ provide: Services.AUTH, useClass: AuthService }],
})
export class AuthModule {}
