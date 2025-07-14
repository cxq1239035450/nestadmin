import { Roles } from '@modules/roles/entities/roles.entity'
import { LoginAuthDto } from '@modules/auth/dto/login-auth.dto'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto extends LoginAuthDto {
  @ApiProperty({
    description: '角色',
    example: '1',
  })
  roles?: Roles[]
}
