import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { AbstractHttpAdapter } from '@nestjs/core'

// import * as requestIp from 'request-ip';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter: AbstractHttpAdapter) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const msg: unknown =
      exception['response']?.message || 'Internal Server Error'

    const responseBody = {
      status: httpStatus,
      // IP信息
      // ip: requestIp.getClientIp(request),
      // exceptioin: exception['name'],
      error: msg,
    }
    this.httpAdapter.reply(response, responseBody, httpStatus)
  }
}
