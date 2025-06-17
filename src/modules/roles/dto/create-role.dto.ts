import { IsString, IsNotEmpty, IsOptional, IsArray, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
  @ApiProperty({ description: '角色名称' })
  @IsString({ message: '角色名称必须是字符串' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  name: string

  @ApiProperty({ description: '角色描述' })
  @IsString({ message: '角色描述必须是字符串' })
  @IsOptional()
  description?: string

  @ApiProperty({ description: '角色状态：0-禁用，1-启用', default: 1 })
  @IsNumber({}, { message: '状态必须是数字' })
  @IsOptional()
  status?: number

  @ApiProperty({ description: '角色权限', type: [String] })
  @IsArray({ message: '权限必须是数组' })
  @IsOptional()
  permissions?: string[]
}
