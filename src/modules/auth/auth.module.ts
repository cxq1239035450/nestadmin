import { Global, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'
import { JwtEnum } from '@enums/config.enum'
import { JwtStrategy } from './jwt.strategy'
import { JwtGuard } from '@guards/jwt.guard'
import { RedisCacheModule } from '@shared/redis/redis.module'

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(JwtEnum.SECRET),
        signOptions: { expiresIn: '8h' },
      }),
    }),
    RedisCacheModule,
  ],
  providers: [AuthService, JwtStrategy,JwtGuard],
  controllers: [AuthController],
  exports: [AuthService,JwtModule,JwtGuard],
})
export class AuthModule {}
