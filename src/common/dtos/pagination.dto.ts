import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsNumber } from 'class-validator'
import { Transform } from 'class-transformer'

export class PaginnationDto {
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
}