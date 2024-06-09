import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'

import { UserModule } from '@modules/user/user.module'
import { AuthModule } from '@modules/auth/auth.module'
import { LogsModule } from '@modules/logs/logs.module'
import { TasksModule } from '@modules/tasks/tasks.module'
import { RolesModule } from '@modules/roles/roles.module'

import { typeOrmConfig } from '@configs/ormConfig'
import { envConfig } from '@configs/envConfig'
import { RoleGuard } from '@guards/role.guard'

import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    //解析配置
    ConfigModule.forRoot(envConfig),
    // 定时任务
    ScheduleModule.forRoot(),
    // 读写数据库
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    LogsModule,
    TasksModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
