import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class LoginLog {
  // 主键，自动生成
  @PrimaryGeneratedColumn()
  id: number;

  // 用户 ID，关联用户表
  @Column()
  userId: number;

  @Column({ comment:'IP地址', length: 45 })
  ipAddress: string;

  // 登录的用户代理信息
  @Column({ comment:'代理信息',nullable: true, length: 255 })
  userAgent: string;

  // 登录结果，如成功、失败等
  @Column({ comment:'登录结果',length: 20 })
  loginResult: string;

  // 响应信息
  @Column({ nullable: true, length: 255 })
  msg: string;

  // 自动记录登录时间
  @CreateDateColumn()
  loginTime: Date;
}