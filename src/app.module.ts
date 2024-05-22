import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'

import { UserModule } from './modules/user/user.module'
import { User } from './modules//user/entities/user.entity'
import { Profile } from './modules//user/entities/profile.entity'
import { Roles } from './modules/rules/entities/roles.entity'
import { Logs } from './modules/logs/entities/logs.entity'
import { AuthModule } from './modules/auth/auth.module'

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`.trimEnd()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //设置成全局
      envFilePath, //指定环境变量文件
      // load: [],
    }),
    // 定时任务
    ScheduleModule.forRoot(),
    // 读写数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Profile, Roles, Logs],
        synchronize: true,
        logging: ['error'],
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
