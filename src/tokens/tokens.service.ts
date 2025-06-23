import { HttpException, Injectable } from '@nestjs/common';
import { ITokensService } from './tokens';
import { Token, User } from '../utils/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { HttpStatusCode } from 'axios';
import { usageGraph } from 'src/utils/types';
import { format } from 'date-fns';

@Injectable()
export class TokensService implements ITokensService {
  constructor(
    @InjectRepository(Token)
    private readonly tokensRepository: Repository<Token>,
  ) {}

  async addTokens(numOfTokens: number, user: User): Promise<void> {
    try {
      const today = new Date();
      const dateOnly = today.toISOString().slice(0, 10);
      console.log(dateOnly);
      let token = await this.tokensRepository.findOne({
        where: {
          user: { id: user.id },
          date: dateOnly,
        },
      });
      if (token) {
        token.usage += numOfTokens;
      } else {
        token = this.tokensRepository.create({
          user,
          date: dateOnly,
          usage: numOfTokens,
        });
      }
      await this.tokensRepository.save(token);
    } catch (error) {
      throw new HttpException(error.message, HttpStatusCode.BadGateway);
    }
  }

  async getUserWeeklyUsage(user: User): Promise<usageGraph> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - 7);

    const weeklyUsage = await this.tokensRepository.find({
      where: {
        user: { id: user.id },
        date: Between(
          fromDate.toISOString().slice(0, 10),
          today.toISOString().slice(0, 10),
        ),
      },
      order: {
        date: 'ASC',
      },
    });

    const usageMap = new Map<string, number>();
    for (const record of weeklyUsage) {
      usageMap.set(record.date, record.usage);
    }

    const labels: string[] = [];
    const data: number[] = [];

    for (let i = 0; i < 7; i++) {
      const current = new Date(fromDate);
      current.setDate(fromDate.getDate() + i);
      const dateStr = current.toISOString().slice(0, 10);
      labels.push(dateStr);
      data.push(usageMap.get(dateStr) ?? 0);
    }

    return { labels, data };
  }
}
