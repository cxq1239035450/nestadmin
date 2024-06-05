import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
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

  // @IsString()
  executionResult?: string

  @IsString()
  data: string

  // @IsNumberString()
  status: number

  @IsString()
  executionTime: string
}
