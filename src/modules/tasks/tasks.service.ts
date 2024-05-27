import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Cron, SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'

@Injectable()
export class TasksService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  create(createTaskDto: CreateTaskDto) {
    const job = new CronJob(`${10} * * * * *`, () => {
      console.log(1111111111111)
    })
    this.schedulerRegistry.addCronJob('cron', job)
    job.start()
  }

  async findAll() {
    // 获取所有任务的逻辑
    const jobs = await this.schedulerRegistry.getCronJobs()

  }
  stopAll() {
    const jobs = this.schedulerRegistry.getCronJobs()
    jobs.forEach(job => job.stop())
  }
}
