import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsNumber, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class QueryRoleDto {
  @ApiProperty({ description: '页码', required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  offset?: number

  @ApiProperty({ description: '每页数量', required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit?: number

  @ApiProperty({ description: '角色名称', required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ description: '角色状态', required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  status?: number
}