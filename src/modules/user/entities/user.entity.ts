import { Exclude } from 'class-transformer'
import { Logs } from '@modules/logs/entities/logs.entity'
import { Roles } from '@modules/roles/entities/roles.entity'

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @ManyToMany(() => Roles, role => role.users)
  roles: Roles[]

  @OneToMany(() => Logs, logs => logs.user)
  logs: Logs[]
}
