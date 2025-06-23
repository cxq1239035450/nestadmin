// redis.module.ts
import { Module } from '@nestjs/common'
import { RedisModule } from '@nestjs-modules/ioredis'
import { RedisService } from './redis.service'
import { ConfigService,ConfigModule } from '@nestjs/config';
import { RedisEnum } from '@enums/config.enum'

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'single', // 连接类型
        options: {
          host: configService.get<string>(RedisEnum.REDIS_HOST), // Redis 服务器地址
          port: configService.get<number>(RedisEnum.REDIS_PORT), // Redis 端口
          // password: configService.get<string>(RedisEnum.REDIS_PASSWORD), // 如果有设置密码的话
          db: configService.get<number>(RedisEnum.REDIS_DB), // 如果你需要使用特定的数据库的话
        },
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisCacheModule {}
