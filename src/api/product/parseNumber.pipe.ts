import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseNumberPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const parsedValue = Number(value);

    if (isNaN(parsedValue) || !Number.isInteger(parsedValue)) {
      throw new BadRequestException(
        `${metadata.data} must be an integer number`,
      );
    }

    return parsedValue;
  }
}
