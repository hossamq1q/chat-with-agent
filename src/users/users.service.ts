import { HttpException, Injectable } from '@nestjs/common';
import { IUsersService } from './users';
import { User } from 'src/utils/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signupPayload } from 'src/utils/types';
import { hashPassword } from '../utils/helpers';
import { HttpStatusCode } from 'axios';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(payload: signupPayload): Promise<User> {
    try {
      payload.password = await hashPassword(payload.password);
      const newUser = this.usersRepository.create(payload);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatusCode.InternalServerError);
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      return this.usersRepository.findOne({ where: { email: email } });
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatusCode.InternalServerError);
    }
  }
}
