import { Injectable, UseGuards } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { In, Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { SelectUserDto } from './dto/select-user.dto'
import { Roles } from '@modules/roles/entities/roles.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const res = await this.userRepository.create(createUserDto)

    res.roles = await this.rolesRepository.find({
      where: {
        id: In(res.roles),
      },
    })
    return this.userRepository.save(res) // 返回保存后的数据
  }

  async findAll() {
    return this.userRepository.find()
  }

  find(selectUserDto: SelectUserDto) {
    return this.userRepository.findOne({
      where: { ...selectUserDto },
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.find({ id })
    console.log(user, 'useruseruseruser')

    const roles = await this.rolesRepository.find({
      where: {
        id,
      },
    })
    console.log(roles, 'rolesrolesroles')

    user.roles = roles
    return this.userRepository.save(user)
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }
}
