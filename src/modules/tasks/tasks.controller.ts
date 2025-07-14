import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Query,
  Put,
  Req,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { PaginnationDto } from '@dtos/pagination.dto'
import { idDto } from '@dtos/id.dto'
import { AuthGuard } from '@nestjs/passport'
import { RoleGuard } from '@guards/role.guard'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('定时任务')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: '获取任务列表' })
  @Get('list')
  getList(@Query() PaginnationDto: PaginnationDto, @Req() req: any) {
    
    return this.tasksService.findAll(PaginnationDto)
  }

  @ApiOperation({ summary: '获取任务详情' })
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.tasksService.findOne(id)
  }

  @ApiOperation({ summary: '创建任务' })
  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto) {
    if (createTaskDto.executionTime.split(' ').length !== 6) {
      throw new BadRequestException('executionTime格式错误')
    }
    return this.tasksService.create(createTaskDto)
  }

  @ApiOperation({ summary: '删除任务' })
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.tasksService.remove(id)
  }

  @ApiOperation({ summary: '暂停任务' })
  @Post('stop')
  stop() {
    return this.tasksService.stopAll()
  }

  @ApiOperation({ summary: '立即执行一次' })
  @Post('start')
  async start(@Body() dto: idDto) {
    const res = await this.tasksService.findOne(dto.id)
    return this.tasksService.executeJob(res)
  }

  @ApiOperation({ summary: '修改任务' })
  @Put('update')
  update(@Body() updateTaskDto: UpdateTaskDto & idDto) {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto)
  }

  @ApiOperation({ summary: '修改任务状态' })
  @Patch('changeStatus')
  changeStatus(@Body('jobId') jobId: number, @Body('status') status: number, @Req() req: any) {
    return this.tasksService.changeStatus(jobId, status, req.user?.userName);
  }
}
