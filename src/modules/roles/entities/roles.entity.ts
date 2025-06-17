import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { User } from '@modules/user/entities/user.entity'
@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50, unique: true, comment: '角色名称' })
  name: string

  @Column({ length: 100, nullable: true, comment: '角色描述' })
  description: string

  @Column({ default: 1, comment: '角色状态：0-禁用，1-启用' })
  status: number

  @Column({ type: 'json', nullable: true, comment: '角色权限' })
  permissions: string[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间' })
  createTime: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', comment: '更新时间' })
  updateTime: Date

  @ManyToMany(() => User, user => user.roles)
  @JoinTable({ 
    name: 'roles_user',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
  })
  users?: User[]
}
