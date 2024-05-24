import { IsString, Length } from 'class-validator'

export class LoginAuthDto {
  @IsString()
  @Length(3, 5, { message: '用户名长度只能为3-5' })
  username: string

  @IsString()
  password: string
}
