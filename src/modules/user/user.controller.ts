import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { TypeormFilter } from '@filters/typeorm.filter'
import { AuthGuard } from '@nestjs/passport'
import { RoleGuard } from '@guards/role.guard'
import { idDto } from '@dto/id.dto'
import { SelectUserDto } from './dto/select-user.dto'

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor) //过滤entity中Exclude的属性
@UseFilters(new TypeormFilter())
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.find({
      username: createUserDto.username,
    })
    if (user) {
      return new BadRequestException('用户名已存在')
    }
    return this.userService.create(createUserDto)
  }

  @Get('list')
  findAll(@Param() selectObj: SelectUserDto) {
    return this.userService.find(selectObj)
  }

  @Post('info')
  getInfo(@Body() createUserDto: CreateUserDto) {}

  @Patch('update')
  update(@Body() updateUserDto: UpdateUserDto & idDto) {
    return this.userService.update(updateUserDto.id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.remove(id)
  }
}
