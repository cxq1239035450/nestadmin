import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Roles } from './entities/roles.entity'
import { Repository } from 'typeorm'

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Roles) private rolesRepository: Repository<Roles>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const role = await this.rolesRepository.create(createRoleDto)
    return this.rolesRepository.save(role)
  }

  findOne(id: number) {
    return this.rolesRepository.findOne({
      where: {
        id,
      },
    })
  }
}
