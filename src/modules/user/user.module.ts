import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'

import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Roles } from '@modules/roles/entities/roles.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Roles])], // 导入User实体,
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
