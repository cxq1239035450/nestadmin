import { IsString, Length, IsNotEmpty } from 'class-validator'

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  @Length(8, 16, { message: '密码长度限制为8-16位字符' })
  password: string
}
