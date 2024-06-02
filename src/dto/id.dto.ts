import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

export class idDto {
  @IsNumberString()
  @IsNotEmpty()
  id: number
}
