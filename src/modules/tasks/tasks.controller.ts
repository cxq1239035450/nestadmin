import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Patch,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { idDto } from '@dto/id.dto'
import { AuthGuard } from '@nestjs/passport'
import { RoleGuard } from '@guards/role.guard'
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
  getList() {
    return this.tasksService.findAll()
  }

  @ApiOperation({
    summary: '创建任务',
  })
  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto) {
    if (createTaskDto.executionTime.split(' ').length !== 6) {
      return new BadRequestException('executionTime格式错误')
    }
    return this.tasksService.create(createTaskDto)
  }

  @ApiOperation({
    summary: '删除任务',
  })
  @Post('remove')
  remove(@Body() dto: idDto) {
    return this.tasksService.remove(dto.id)
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
