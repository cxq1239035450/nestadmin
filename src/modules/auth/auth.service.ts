import { Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'

import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.find(username)
    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }
    return null
  }
}