import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { idDto } from '@dto/id.dto'
import { AuthGuard } from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get('list')
  getList() {
    return this.tasksService.findAll()
  }

  @Post('add')
  create(@Body() createTaskDto: CreateTaskDto) {
    if (createTaskDto.executionTime.split(' ').length !== 6) {
      return new BadRequestException('executionTime格式错误')
    }
    return this.tasksService.create(createTaskDto)
  }

  @Post('remove')
  remove(@Body() dto: idDto) {
    return this.tasksService.remove(dto.id)
  }

  @Post('stop')
  stop() {
    return this.tasksService.stopAll()
  }

  @Post('start')
  start(@Body() dto: idDto) {
    return this.tasksService.start(dto.id)
  }

  @Post('update')
  update(@Body() updateTaskDto: UpdateTaskDto & idDto) {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto)
  }
}
