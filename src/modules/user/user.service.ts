import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto, '===========')

    const res = await this.userRepository.create(createUserDto)
    return this.userRepository.save(res) // 返回保存后的数据
  }

  async findAll() {
    return this.userRepository.find()
  }

  find(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: ['roles', 'roles.menus'],
    })
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }
}
