import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from './auth.service'

import { LoginAuthDto } from './dto/login-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { UserService } from '../user/user.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto)
  }
  @Post('sign')
  async sign(@Body() dto) {
    this.jwtService.signAsync(dto)

    return {}
  }
}
