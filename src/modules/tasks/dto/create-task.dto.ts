import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator'

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  description: string

  @IsString()
  @IsNotEmpty()
  url: string

  @IsString()
  headers: string

  @IsString()
  executionResult: string

  @IsString()
  data: string

  @IsNumber()
  status: number

  @IsDateString()
  executionTime: string
}
