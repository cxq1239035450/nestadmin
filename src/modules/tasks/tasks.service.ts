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
import { PaginnationDto } from '@dto/pagination.dto'

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
    this.createJob(task)
     this.tasksRepository.save(task)
  }

  createJob(createTaskDto: Tasks) {
    const job = new CronJob(createTaskDto.executionTime, async () => {
      await this.executeJob(createTaskDto)
    })
    this.schedulerRegistry.addCronJob(createTaskDto.name, job)
    job.start()
    return job
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
}
