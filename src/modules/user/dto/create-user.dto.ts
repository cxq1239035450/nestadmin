import { IsString, IsInt, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsInt()
  password: string
}
