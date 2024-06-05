import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { RulesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'

@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Post()
  create(@Body() createRuleDto: CreateRoleDto) {
    return this.rulesService.create(createRuleDto)
  }

  @Get()
  findAll() {
    return this.rulesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rulesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRuleDto: UpdateRoleDto) {
    return this.rulesService.update(+id, updateRuleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rulesService.remove(+id)
  }
}
