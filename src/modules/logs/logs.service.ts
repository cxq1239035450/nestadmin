import { Injectable } from '@nestjs/common'
import { CreateLogDto } from './dto/create-log.dto'
import { UpdateLogDto } from './dto/update-log.dto'
import { UAParser } from 'ua-parser-js'
import { Request } from 'express'

@Injectable()
export class LogsService {
  create(createLogDto: CreateLogDto) {
    return 'This action adds a new log'
  }

  findAll() {
    return `This action returns all logs`
  }

  findOne(id: number) {
    return `This action returns a #${id} log`
  }

  update(id: number, updateLogDto: UpdateLogDto) {
    return `This action updates a #${id} log`
  }

  remove(id: number) {
    return `This action removes a #${id} log`
  }
  /**
   * 记录登录或退出日志
   * @param username 用户名
   * @param req 请求对象
   * @param status 状态
   * @param msg 日志信息
   */
  async loginInfoAdd(
    username: string,
    req: Request,
    status: string,
    msg: string,
  ) {
    const userAgent = req.headers['user-agent']
    const parser = new UAParser(userAgent)
    const result = parser.getResult()
  }
}
