import { ExecutionContext, SetMetadata, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ExtractJwt } from 'passport-jwt'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtEnum } from '@enums/config.enum'
import { InjectRedis } from '@nestjs-modules/ioredis'
import { Redis } from 'ioredis'

// 不需要权限判断需要添加的装饰器
export const NotRequireAuth = () => SetMetadata('notRequireAuth', true);

export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRedis() private readonly redis: Redis,
  ) {
    super()
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    // 处理不需要鉴权的请求
    const notRequireAuth = this.reflector.getAllAndOverride('notRequireAuth', [
      ctx.getClass(),
      ctx.getHandler(),
    ])
    if (notRequireAuth) {
      return true
    }
    const request = ctx.switchToHttp().getRequest()

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request)
    if (!token) {
      throw new UnauthorizedException('请重新登录')
    }

    try {
      const payload = await this.jwtService.verify(
        token,
        this.configService.get(JwtEnum.SECRET),
      )
      const username = payload['username']
      const tokenCache = username ? await this.redis.get(username) : null

      if (!payload || !username || tokenCache !== token) {
        throw new UnauthorizedException('登录已过期，请重新登录')
      }
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('登录已过期，请重新登录')
      }
      throw new UnauthorizedException('请重新登录')
    }

    const parentCanActivate = (await super.canActivate(ctx)) as boolean
    return parentCanActivate
  }
}

// 装饰器
// @JwtGuard()
