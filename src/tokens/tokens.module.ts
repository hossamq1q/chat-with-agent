import { Module } from '@nestjs/common';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { Services } from "../utils/constants";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Token } from "../utils/typeorm";
import { UsersModule } from "../users/users.module";

@Module({
  imports:[TypeOrmModule.forFeature([Token]),UsersModule],
  controllers: [TokensController],
  providers: [{provide:Services.TOKENS , useClass: TokensService}],
  exports:[{provide:Services.TOKENS , useClass: TokensService}]
})
export class TokensModule {}
