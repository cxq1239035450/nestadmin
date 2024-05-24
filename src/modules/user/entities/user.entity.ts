import { Logs } from '../../logs/entities/logs.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(() => Logs, logs => logs.user)
  logs: Logs[]
}
