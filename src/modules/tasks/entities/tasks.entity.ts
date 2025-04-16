import { IsCronTime } from 'src/common/decorators/isCronTime.decorator'
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

  @Column({comment: '0: 未执行，1: 执行中'})
  name: string

  @Column({ comment:'描述', default: '' })
  description: string

  @Column({comment: '请求路径'})
  url: string

  @Column({ comment:'请求头',type: 'text'})
  headers: string

  @Column({ comment:'请求体'})
  data: string

  @Column({ comment:'执行结果', default: '' })
  executionResult: string

  @Column({comment: '0: 未执行，1: 执行中'})
  status: number

  @IsCronTime()
  @Column({comment: '执行时间'})
  executionTime: string

  @Column({comment: '上次执行时间'})
  preExecutionTime: string

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Column({comment: '创建时间'})
  createTime: Date
}
