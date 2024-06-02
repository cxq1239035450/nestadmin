import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Response } from '@type/request'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // const ctx = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map(data => {
        return { code: 200, data, msg: '请求成功' }
      }),
    )
  }
}
