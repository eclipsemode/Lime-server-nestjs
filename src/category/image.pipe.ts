import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImagePipe implements PipeTransform {
  transform(value: File, metadata: ArgumentMetadata) {
    const maxSize = 10000;

    return value.size < maxSize;
  }
}
