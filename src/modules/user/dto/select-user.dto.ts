import { IsString, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator'

export class SelectUserDto {
  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsNumberString()
  page?: number
  
  @IsOptional()
  @IsNumberString()
  limit?: number
}
