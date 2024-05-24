import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'


import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.find(username)
    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }
    return null
  }
  async login(user: any) {
    const payload = { username: user.username, password: user.password }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
