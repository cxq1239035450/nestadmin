import { Module } from '@nestjs/common'
import { RulesService } from './roles.service'
import { RulesController } from './roles.controller'

@Module({
  controllers: [RulesController],
  providers: [RulesService],
})
export class RulesModule {}
