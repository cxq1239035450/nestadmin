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
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { TypeormFilter } from '@filters/typeorm.filter'
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor) //过滤entity中Exclude的属性
@UseFilters(new TypeormFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    return {
      code: 200,
      token: '1123',
    }
  }
  @Post('info')
  getInfo(@Body() createUserDto: CreateUserDto) {
    return {
      code: 200,
      token: '1123',
    }
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto)

    return this.userService.create(createUserDto)
  }

  @Get('list')
  findAll() {
    return this.userService.findAll()
  }
  @Get(':name')
  find(@Param('name') name: string) {
    return this.userService.find(name)
  }
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
