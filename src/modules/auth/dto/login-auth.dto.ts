import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsNotEmpty,ValidateIf } from 'class-validator'

export class LoginAuthDto {
  @ApiProperty({
    description: '用户名',
    example: 'admin',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string
  
  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(8, 16, { message: '密码长度限制为8-16位字符' })
  password: string
}
