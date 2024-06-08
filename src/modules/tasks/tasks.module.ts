import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tasks } from './entities/tasks.entity'
import { HttpModule } from '@nestjs/axios'
import { UserModule } from '@modules/user/user.module'

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Tasks]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
