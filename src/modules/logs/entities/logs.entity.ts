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

  @Column({comment: '请求路径'})
  path: string

  @Column({comment: '请求方法'})
  method: string

  @Column({comment: '请求参数'})
  data: string

  @Column({comment: '请求结果'})
  result: number

  @ManyToOne(() => User, user => user.logs)
  @JoinColumn()
  user: User
}
