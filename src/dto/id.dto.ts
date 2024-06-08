import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator'

export class idDto {
  @IsNumber()
  @IsNotEmpty()
  id: number
}
