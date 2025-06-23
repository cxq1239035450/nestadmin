import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { PaginnationDto } from '@dtos/pagination.dto'
import { idDto } from 'src/common/dtos/id.dto'
import { AuthGuard } from '@nestjs/passport'
import { RoleGuard } from 'src/common/guards/role.guard'
import { ApiTags,ApiOperation } from '@nestjs/swagger'

@ApiTags('定时任务')
@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({
    summary: '获取任务列表',
  })
  @Get('list')
  getList(@Query() PaginnationDto: PaginnationDto) {
    return this.tasksService.findAll(PaginnationDto)
  }

  @ApiOperation({
    summary: '创建任务',
  })
  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto) {
    if (createTaskDto.executionTime.split(' ').length !== 6) {
      throw new BadRequestException('executionTime格式错误')
    }
    return this.tasksService.create(createTaskDto)
  }

  @ApiOperation({
    summary: '删除任务',
  })
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.tasksService.remove(id)
  }

  @ApiOperation({
    summary: '暂停任务',
  })
  @Post('stop')
  stop() {
    return this.tasksService.stopAll()
  }

  @ApiOperation({
    summary: '执行任务',
  })
  @Post('start')
  async start(@Body() dto: idDto) {
    const res = await this.tasksService.findOne(dto.id)
    return this.tasksService.executeJob(res)
  }

  @ApiOperation({
    summary: '修改任务',
  })
  @Patch('update')
  update(@Body() updateTaskDto: UpdateTaskDto & idDto) {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto)
  }
}
