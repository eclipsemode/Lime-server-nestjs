import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductReqDto } from './dto/create-product-req.dto';
import { CreateProductResDto } from './dto/create-product-res.dto';
import { ApiFile } from '@decorators/api-file.decorator';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({
    summary: 'Create product',
    description: 'Create product',
  })
  @ApiFile('image', false, { name: { type: 'string' } }, CreateProductReqDto)
  @ApiCreatedResponse({
    type: CreateProductResDto,
    description: 'Product successfully created',
  })
  create(
    @Body() createProductReqDto: CreateProductReqDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242047 }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|png)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.productService.create(createProductReqDto, image);
  }

  delete() {}
}
