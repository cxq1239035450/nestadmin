import { Module } from '@nestjs/common'
import { RulesService } from './roles.service'
import { RulesController } from './roles.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Roles } from './entities/roles.entity'

@Module({
  imports:[TypeOrmModule.forFeature([Roles])],
  controllers: [RulesController],
  providers: [RulesService],
})
export class RulesModule {}
