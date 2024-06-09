import { User } from '@modules/user/entities/user.entity'
import { IsString } from 'class-validator'

export class CreateRoleDto {
  @IsString()
  name: string

  users?: User[]
}
