import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from './user/user.module'
import { User } from './user/entities/user.entity'
import { Profile } from './user/entities/profile.entity'
import { Roles } from './rules/entities/roles.entity'
import { Logs } from './logs/entities/logs.entity'

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`.trimEnd()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //设置成全局
      envFilePath, //指定环境变量文件
      // load: [],
    }),
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
