import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreatedBy } from "../../constants";
import { Conversation } from "./Conversation";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"text"})
  content:string

  @ManyToOne(() => Conversation, { eager: false, nullable: false })
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversation;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: CreatedBy,
    name:'created_by',
  })
  createdBy: CreatedBy;


}