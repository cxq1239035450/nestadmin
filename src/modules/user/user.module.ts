import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'

import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Roles } from '@modules/roles/entities/roles.entity'
import { CommonUploadModule } from '@common/upload/upload.module'
@Module({
  imports: [TypeOrmModule.forFeature([User, Roles]),CommonUploadModule], // 导入User实体,
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
