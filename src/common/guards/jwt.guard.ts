import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '@enums/config.enum';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis'

export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    private configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRedis() private readonly redis: Redis,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // custom logic can go here
    const request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    // const cacheToken = this.redis.get(token);
    if (!token) {
      throw new UnauthorizedException();
    }
    const payload = await this.jwtService.verify(
      token,
      this.configService.get(ConfigEnum.SECRET),
    );
    const username = payload['username'];
    const tokenCache = username ? await this.redis.get(username) : null;
    console.log(tokenCache,'9--------------------');
    
    if (!payload || !username || tokenCache !== token) {
      throw new UnauthorizedException();
    }

    const parentCanActivate = (await super.canActivate(context)) as boolean; // this is necessary due to possibly returning `boolean | Promise<boolean> | Observable<boolean>
    // custom logic goes here too
    return parentCanActivate;
  }
}

// 装饰器
// @JwtGuard()
