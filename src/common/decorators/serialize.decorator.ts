import { UseInterceptors } from '@nestjs/common'
import { SerializeInterceptor } from 'src/common/interceptors/serialize.interceptor'
import { ClassConstructor } from 'src/types/index'

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}
