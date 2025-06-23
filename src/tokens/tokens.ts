import { User } from '../utils/typeorm';
import { usageGraph } from '../utils/types';

export interface ITokensService {
  addTokens(numOfTokens: number, user: User): Promise<void>;

  getUserWeeklyUsage(user: User): Promise<usageGraph>;
}
