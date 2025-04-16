import { Module,MiddlewareConsumer,RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static';
// import { EventEmitterModule } from '@nestjs/event-emitter'; // 发布订阅管理

import { UserModule } from '@modules/user/user.module'
import { AuthModule } from '@modules/auth/auth.module'
import { LogsModule } from '@modules/logs/logs.module'
import { TasksModule } from '@modules/tasks/tasks.module'
import { RolesModule } from '@modules/roles/roles.module'

import { typeOrmConfig } from '@configs/ormConfig'
import { envConfig } from '@configs/envConfig'
import { ServeStaticConfig } from '@configs/serveStaticConfig'

import { RoleGuard } from 'src/common/guards/role.guard'
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    //解析配置
    ConfigModule.forRoot(envConfig),
    // 定时任务
    ScheduleModule.forRoot(),
    // 读写数据库
    TypeOrmModule.forRoot(typeOrmConfig),
    // 静态资源托管
    ServeStaticModule.forRoot(...ServeStaticConfig),
    UserModule,
    AuthModule,
    LogsModule,
    TasksModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/{*splat}', method: RequestMethod.ALL });
  }
}
