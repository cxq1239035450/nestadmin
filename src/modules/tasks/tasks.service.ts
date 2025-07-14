import { Header, Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'
import { Repository } from 'typeorm'
import { Tasks } from './entities/tasks.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom, map, of } from 'rxjs'
import { getTime } from '@utils/time'
import { idDto } from 'src/common/dtos/id.dto'
import { PaginnationDto } from '@dtos/pagination.dto'
import { ExportTable } from '@utils/export';
import { Response } from 'express'
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly tasksRepository: Repository<Tasks>,
    private schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
  ) {
    this.init()
  }

  async init() {
    const allList = await this.tasksRepository.find({
      where: {
        status: 1,
      },
    })
    for (const item of allList) {
      this.createJob(item)
    }
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create(createTaskDto)
    this.tasksRepository.save(task)
    if(createTaskDto.status === 1) {
      this.createJob(task)
    }
  }

  createJob(createTaskDto: Tasks) {
    const job = new CronJob(createTaskDto.executionTime, async () => {
      await this.executeJob(createTaskDto)
    })
    this.schedulerRegistry.addCronJob(createTaskDto.name, job)
    job.start()
    return job
  }
  getCronJob(name: string) {
    try {
      return this.schedulerRegistry.getCronJob(name);
    } catch (e) {
      return null;
    }
  }

  async changeStatus(id: number, status: number,uesrName: string) {
    const task = await this.findOne(id);
    if (!task) {
      throw new Error('任务不存在');
    }

    const cronJob = this.getCronJob(task.name);

    if (status === 1) {
      // 启用
      if (!cronJob) {
      } else {
        cronJob.start();
      }
    } else {
      // 停用
      if (cronJob) {
        cronJob.stop();
      }
    }
    await this.update(id, { status })
  }

  async executeJob(createTaskDto: CreateTaskDto & idDto) {
    const res = await this.sendMessage(createTaskDto)
    return this.update(createTaskDto.id, {
      executionResult: JSON.stringify(res),
      preExecutionTime: getTime(),
    })
  }
  
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update(id, updateTaskDto)
  }

  async remove(id: number) {
    return this.tasksRepository.delete(id)
  }

  async findAll({ limit, offset}: PaginnationDto) {
    const [tasksList, total] = await this.tasksRepository.findAndCount({
      // where: {},
      take: limit || 10,
      skip: offset || 0,
    })
    return {
      list: tasksList,
      total,
    }
  }
  async findOne(id: number) {
    return await this.tasksRepository.findOne({ where: { id } })
  }

  stopAll() {
    const jobs = this.schedulerRegistry.getCronJobs()
    jobs.forEach(job => {
      job.stop()
    })
  }

  async start(id: number) {
    const res = await this.tasksRepository.findOne({ where: { id } })
    if (!res) return
    this.createJob(res)
    return res
  }

  async sendMessage(res: CreateTaskDto) {
    return await firstValueFrom(
      this.httpService
        .post(res.url, res.data, {
          headers: JSON.parse(res.headers),
        })
        .pipe(
          map(response => response.data),
          catchError(error => {
            return of(error.response.data)
          }),
        ),
    )
  }

  async export(res: Response, body: any) {
    const data = await this.findAll(body);
    const options = {
      sheetName: '定时任务',
      data: data.list,
      header: [
        { title: '任务编号', dataIndex: 'jobId' },
        { title: '任务名称', dataIndex: 'jobName' },
        { title: '任务组名', dataIndex: 'jobGroup' },
        { title: '调用目标字符串', dataIndex: 'invokeTarget' },
        { title: 'cron执行表达式', dataIndex: 'cronExpression' },
      ],
      dictMap: {
        status: {
          '0': '成功',
          '1': '失败',
        },
        jobGroup: {
          SYSTEM: '系统',
          DEFAULT: '默认',
        },
      },
    };
    ExportTable(options, res);
  }
}
