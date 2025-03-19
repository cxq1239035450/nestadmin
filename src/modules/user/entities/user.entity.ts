import { Exclude } from 'class-transformer'
import { Logs } from '@modules/logs/entities/logs.entity'
import { Roles } from '@modules/roles/entities/roles.entity'

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: "用户名称" })
  username: string

  @Exclude()
  @Column({ comment: "用户密码" })
  password: string

  @ManyToMany(() => Roles, role => role.users, {
    cascade: true,
  })
  @JoinTable({ name: 'user_roles' })
  roles: Roles[]

  @OneToMany(() => Logs, logs => logs.user)
  logs: Logs[]
}
