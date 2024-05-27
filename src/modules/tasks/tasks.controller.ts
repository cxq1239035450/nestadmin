import { Controller, Get, Post, Body } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
  ) {}

  @Post('add')
  create(@Body() createTaskDto: CreateTaskDto) {
    this.tasksService.create(createTaskDto)
    return {}
  }
  @Post('stop')
  stop() {
 
    return {}
  }
  @Get('list')
  getList() {
   return this.tasksService.findAll() 
  }
}
