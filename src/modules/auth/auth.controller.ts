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
import { UserService } from '@modules/user/user.service'
import { ApiTags,ApiOperation } from '@nestjs/swagger'
import { NotRequireAuth } from '@guards/jwt.guard'

@ApiTags('权限')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: '登录',
  })
  @NotRequireAuth()
  @Post('login')
  async login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto)
  }

  @ApiOperation({
    summary: '退出',
  })
  @Post('logout')
  async logout(@Request() req: any) {
    return this.authService.loginOut(req.user)
  }
}
