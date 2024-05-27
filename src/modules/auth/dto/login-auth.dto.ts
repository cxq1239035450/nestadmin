import { IsString, Length } from 'class-validator'

export class LoginAuthDto {
  @IsString()
  username: string
  @Length(8, 16, { message: '密码长度限制为8-16位字符' })
  @IsString()
  password: string
}
