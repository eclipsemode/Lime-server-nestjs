import { applyDecorators, Type, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export function ApiFile(
  fieldName: string = 'file',
  required: boolean = false,
  additionalProps: Record<string, SchemaObject | ReferenceObject> = {},
  bodyTypeReq: string | Function | Type<unknown> | [Function] = 'object',
  localOptions?: MulterOptions,
) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, localOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: bodyTypeReq,
      schema: {
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
          },
          ...additionalProps,
        },
      },
    }),
  );
}
