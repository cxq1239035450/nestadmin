import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`.trimEnd()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //设置成全局
      envFilePath, //指定环境变量文件
      // load: [],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
