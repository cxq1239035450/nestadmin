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

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP',comment: "上次登录时间" })
  // lastLoginTime: Date

  @ManyToMany(() => Roles, role => role.users, {
    cascade: true,
  })
  @JoinTable({ 
    name: 'user_roles',
    // joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    // inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
   })
  roles: Roles[]

  @OneToMany(() => Logs, logs => logs.user)
  logs: Logs[]
}
