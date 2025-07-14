import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { In, Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { SelectUserDto } from './dto/select-user.dto'
import { Roles } from '@modules/roles/entities/roles.entity'
import { idDto } from '@dtos/id.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const res = this.userRepository.create(createUserDto)
    res.password = await argon2.hash(res.password)
    res.roles = await this.rolesRepository.find({
      where: {
        id: In(createUserDto.roles || []),
      },
    })
    return this.userRepository.save(res) // 返回保存后的数据
  }

  async findAll() {
    return this.userRepository.find()
  }

  find(selectUserDto: SelectUserDto|idDto): Promise<User[]> {
    return this.userRepository.find({
      where: { ...selectUserDto },
      relations: ['roles'],
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.find({ id })

    updateUserDto[0].roles = await this.rolesRepository.find({
      where: {
        id: 1,
      },
    })
    return this.userRepository.save({ ...user, ...updateUserDto })
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }
}
