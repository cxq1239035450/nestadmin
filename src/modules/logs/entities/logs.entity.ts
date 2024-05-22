import { User } from '../../user/entities/user.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  path: string

  @Column()
  method: string

  @Column()
  data: string

  @Column()
  result: number

  @ManyToOne(() => User, user => user.logs)
  @JoinColumn()
  user: User
}
