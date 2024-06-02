import { Header, Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'
import { Repository } from 'typeorm'
import { Task } from './entities/task.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom, map } from 'rxjs'
import { Serialize } from '@decorators/serialize.decorator'
import { getTime } from '@utils/time'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
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
    allList.forEach(async item => {
      this.createJob(item)
    })
    console.log(allList, '=================初始化任务脚本')
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.tasksRepository.create(createTaskDto)
    this.createJob(task)
    return this.tasksRepository.save(task)
  }
  createJob(createTaskDto: Task) {
    const job = new CronJob(createTaskDto.executionTime, async () => {
      const res = await this.sendMessage(createTaskDto)
      console.log(
        res,
        '===============================执行结果',
        getTime(new Date()),
      )
      
      this.update(createTaskDto.id, { executionResult: res + '' })
    })
    this.schedulerRegistry.addCronJob(createTaskDto.name, job)
    job.start()
    return job
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update(id, updateTaskDto)
  }

  async remove(id: number) {
    return this.tasksRepository.delete(id)
  }

  async findAll(limit?: number, offset?: number) {
    const [tasksList, total] = await this.tasksRepository.findAndCount({
      // where: {},
      take: limit || 100,
      skip: offset || 0,
    })
    return {
      list: tasksList,
      total,
    }
  }
  async findOne(id: number) {
    const res = await this.tasksRepository.findOne({ where: { id } })
    return res
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
        .pipe(map(response => response.data)),
    )
  }
}
