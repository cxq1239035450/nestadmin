import { IsCronTime } from '@decorators/isCronTime.decorator'
import { IsDate, IsString } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ default: '' })
  description: string

  @Column()
  url: string

  @Column('text')
  headers: string

  @Column()
  data: string

  @Column({ default: '' })
  executionResult: string

  @Column()
  status: number // 0: 未执行，1: 执行中

  @IsCronTime()
  @Column()
  executionTime: string

  @Column()
  preExecutionTime: string

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date
}
