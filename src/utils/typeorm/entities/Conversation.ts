import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Conversation{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token:string;

  @Column()
  conversationName:string;

  @ManyToOne(() => User, { eager: true, nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

}