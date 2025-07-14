import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as argon2 from 'argon2'
import { UserService } from '@modules/user/user.service'
import { RedisService } from '@cmodules/redis/redis.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { User } from '@modules/user/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}
  async validateUser(username: string): Promise<User | null> {
    const user = await this.usersService.find({ username })
    if (user[0]) {
      return user[0]
    }
    return null
  }
  async login(user: LoginAuthDto) {
    const userInfo = await this.validateUser(user.username)
    if (!userInfo) {
      throw new ForbiddenException('用户不存在')
    }

    const isPasswordValid = await argon2.verify(userInfo.password, user.password)
    if (!isPasswordValid) {
      throw new ForbiddenException('用户名或密码错误')
    }
    const cacheToken = await this.redisService.get(`${user.username}`)
    if(cacheToken){
      return {
        access_token: cacheToken
      }
    }
    const payload = { username: user.username, password: user.password, userid: userInfo.id }
    const token = this.jwtService.sign(payload)
    this.redisService.set(`${user.username}`,token)
    return {
      access_token: token,
    }
  }
  loginOut(user) {
    this.redisService.del(user.name)
    return true
  }
}
