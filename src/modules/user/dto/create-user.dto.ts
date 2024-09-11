import { Roles } from '@modules/roles/entities/roles.entity'
import { LoginAuthDto } from '@modules/auth/dto/login-auth.dto'

export class CreateUserDto extends LoginAuthDto {
  roles?: Roles[]
}
