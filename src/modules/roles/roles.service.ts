import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'

@Injectable()
export class RulesService {
  create(createRuleDto: CreateRoleDto) {
    return 'This action adds a new rule'
  }

  findAll() {
    return `This action returns all rules`
  }

  findOne(id: number) {
    return `This action returns a #${id} rule`
  }

  update(id: number, updateRuleDto: UpdateRoleDto) {
    return `This action updates a #${id} rule`
  }

  remove(id: number) {
    return `This action removes a #${id} rule`
  }
}
