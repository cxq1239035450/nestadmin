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

  @Column()
  username: string

  @Exclude()
  @Column()
  password: string

  @ManyToMany(() => Roles, role => role.users)
  @JoinTable({ name: 'user_roles' })
  roles: Roles[]

  @OneToMany(() => Logs, logs => logs.user)
  logs: Logs[]
}
