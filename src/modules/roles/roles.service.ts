import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Roles } from './entities/roles.entity'
import { Repository } from 'typeorm'

@Injectable()
export class RolesService {
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

  async findAll(selectObj) {
    const {
      limit,
      offset,
      ...where
    } = selectObj
    console.log(where,2222222222222);
    
    const [rolesList, total] = await this.rolesRepository.findAndCount({
      where,
      take: limit || 10,
      skip: offset || 0,
    })
    return {
      list:rolesList,
      total,
    }
  }
  
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id)
    if (!role) {
      throw new BadRequestException('角色不存在')
    } 
    return this.rolesRepository.save({
      ...role,
      ...updateRoleDto, 
    })
  }

  async remove(id: number) {
    const result = await this.rolesRepository.delete(id)
    if (result.affected === 0) {
      throw new BadRequestException('角色不存在或删除失败')
    }
    return {
      message: '删除成功',
    }
  }
}
