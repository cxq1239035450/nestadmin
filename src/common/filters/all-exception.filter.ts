import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { AbstractHttpAdapter } from '@nestjs/core'

// import * as requestIp from 'request-ip';

interface HttpExceptionResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  response?: {
    message?: string | string[];
    error?: string;
  };
}
interface ErrorResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter: AbstractHttpAdapter) {}
  catch(exception: HttpException | Error | HttpExceptionResponse, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    // const request = ctx.getRequest()
    const response = ctx.getResponse()

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    const responseBody = {
      code: httpStatus,
      // IP信息
      // ip: requestIp.getClientIp(request),
      // exceptioin: exception['name'],
      msg: this.handleError(exception['response']),
    }
    this.httpAdapter.reply(response, responseBody, httpStatus)
  }
  
  private handleError(errorData: ErrorResponse | string | unknown): string {
    // 处理字符串类型错误
    if (typeof errorData === 'string') {
      return errorData;
    }
    
    // 处理对象类型错误
    if (typeof errorData === 'object' && errorData !== null) {
      const error = errorData as ErrorResponse;
      // 处理消息数组
      if (Array.isArray(error.message)) {
        return error.message[0];
      }
      
      // 处理字符串消息
      if (error.message) {
        return error.message as string;
      }
      
      // 处理错误信息
      if (error.error) {
        return error.error;
      }
    }
    
    return 'Internal Server Error';
  }
}
