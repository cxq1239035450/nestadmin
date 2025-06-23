import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtEnum } from '@enums/config.enum'
import { RedisService } from '@cmodules/redis/redis.service'

interface JwtPayload {
  username: string;
  password: string;
  iat?: number;    // token 创建时间
  exp?: number;    // token 过期时间
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    public configService: ConfigService,
    private redisService: RedisService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JwtEnum.SECRET),
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.redisService.get(`${payload.username}`);
    // 如果用用户信息，代表 token 没有过期，没有则 token 已失效
    if (!user) throw new UnauthorizedException('登录已过期，请重新登录');
    return user;
  }
}
