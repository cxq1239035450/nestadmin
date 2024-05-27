import { IsDate } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  url: string

  @Column()
  headers: string

  @Column()
  data: string

  @Column()
  status: string

  @IsDate()
  @Column()
  executionTime: Date

  @CreateDateColumn()
  createTime: Date
}
