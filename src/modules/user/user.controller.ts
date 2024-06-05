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
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { TypeormFilter } from '@filters/typeorm.filter'
import { AuthGuard } from '@nestjs/passport'
import { RoleGuard } from '@guards/role.guard'

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor) //过滤entity中Exclude的属性
@UseGuards(AuthGuard('jwt'))
@UseFilters(new TypeormFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('info')
  getInfo(@Body() createUserDto: CreateUserDto) { }
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto)

    return this.userService.create(createUserDto)
  }

  @Get('list')
  @UseGuards(RoleGuard)
  findAll() {
    return this.userService.findAll()
  }
  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.remove(id)
  }
}
