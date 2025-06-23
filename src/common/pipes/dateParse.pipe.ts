import { PipeTransform, Injectable,ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class DateParsePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    return date;
  }
}