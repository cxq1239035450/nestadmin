import { UseInterceptors } from '@nestjs/common'
import { SerializeInterceptor } from '@interceptors/serialize.interceptor'
import { ClassConstructor } from '@type/index'

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}
