import { IsString, IsInt, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  password: string
}
