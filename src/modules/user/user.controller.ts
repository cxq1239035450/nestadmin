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
  UploadedFile
} from '@nestjs/common'
import {FileInterceptor} from '@nestjs/platform-express'
import { AuthGuard } from '@nestjs/passport'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { SelectUserDto } from './dto/select-user.dto'
import { TypeormFilter } from '@filters/typeorm.filter'
import { RoleGuard } from '@guards/role.guard'
import { idDto } from '@dtos/id.dto'
import { ApiTags,ApiOperation } from '@nestjs/swagger'
import { NotRequireAuth } from '@guards/jwt.guard'

@ApiTags('用户')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor) //过滤entity中Exclude的属性
@UseFilters(new TypeormFilter())
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: '创建用户' })
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.find({
      username: createUserDto.username,
    })
    if (user[0]) {
      return new BadRequestException('用户名已存在')
    }
    return this.userService.create(createUserDto)
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.remove(id)
  }

  @ApiOperation({ summary: '修改用户' })
  @Patch('update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto)
  }

  @ApiOperation({ summary: '用户列表' })
  @Get('list')
  findAll(@Param() selectObj: SelectUserDto) {
    return this.userService.find(selectObj)
  }

  @ApiOperation({ summary: '用户信息' })
  @Post('info')
  getInfo(@Body() createUserDto) {
    return this.userService.find(createUserDto)
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload (@UploadedFile() file: Express.Multer.File,@Body() body) {
    if (!file) {
      throw new BadRequestException('请选择要上传的文件');
    }
    try {
      // 返回文件信息
      return {
        code: 200,
        message: '上传成功',
      };
    } catch (error) {
      throw new BadRequestException('文件上传失败：' + error.message);
    }
  }
  
}
