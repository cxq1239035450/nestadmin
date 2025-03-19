import { Injectable } from '@nestjs/common'
import { CreateLogDto } from './dto/create-log.dto'
import { UpdateLogDto } from './dto/update-log.dto'
import { UAParser } from 'ua-parser-js' // 解析用户代理
import { Request } from 'express'

@Injectable()
export class LogsService {
  async loginInfoAdd(
    username: string,
    req: Request,
    status: string,
    msg: string,
  ) {
    const userAgent = req.headers['user-agent']
    const result = new UAParser(userAgent).getResult()
    console.log('浏览器信息:', result.browser);
    console.log('操作系统信息:', result.os);
    console.log('设备信息:', result.device);
  }
}
