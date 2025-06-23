import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  Index,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: false, nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'date' })
  @Index()
  date: string;

  @Column({ type: 'int', default: 0 })
  usage: number;
}
