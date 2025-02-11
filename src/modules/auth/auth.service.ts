import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as argon2 from 'argon2'
import { UserService } from '@modules/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.find({ username })
    if (user[0]) {
      return user[0]
    }
    return null
  }
  async login(user: any) {
    const valid = await this.validateUser(user.username, user.password)
    if (!valid) {
      throw new ForbiddenException('用户不存在')
    }

    const isPasswordValid = await argon2.verify(valid.password, user.password)
    if (!isPasswordValid) {
      throw new ForbiddenException('用户名或密码错误')
    }

    const payload = { username: user.username, password: user.password }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
