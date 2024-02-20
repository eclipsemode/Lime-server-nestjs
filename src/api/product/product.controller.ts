import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseArrayPipe,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductReqDto } from './dto/create-product-req.dto';
import { CreateProductResDto } from './dto/create-product-res.dto';
import { ApiFile } from '@decorators/api-file.decorator';
import { GetProductResDto } from '@api/product/dto/get-product-res.dto';
import { SortOrder, SortType } from '@api/product/types/product.type';
import { ParseNumberPipe } from '@api/product/parseNumber.pipe';
import { UpdateProductReqDto } from '@api/product/dto/update-product-req.dto';
import { UpdateProductImageDto } from '@api/product/dto/update-productImage.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({
    summary: 'Create product',
    description: 'Create product',
  })
  @ApiFile('image', false, {}, CreateProductReqDto)
  @ApiCreatedResponse({
    type: CreateProductResDto,
    description: 'Product successfully created',
  })
  create(
    @Body(new ValidationPipe({ transform: true }))
    createProductReqDto: CreateProductReqDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
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

  @Get()
  @ApiQuery({
    name: 'categoryId',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'sortBy',
    enum: SortType,
    required: false,
  })
  @ApiQuery({
    name: 'sortOrder',
    enum: SortOrder,
    required: false,
  })
  @ApiOperation({
    summary: 'Get products',
    description: 'Get products',
  })
  @ApiFoundResponse({
    type: GetProductResDto,
    description: 'Successfully found',
  })
  get(
    @Query('categoryId') categoryId: string,
    @Query('sortBy') sortBy: SortType,
    @Query('sortOrder') sortOrder: SortOrder,
  ) {
    return this.productService.get(categoryId, sortBy, sortOrder);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update product',
    description: 'Update product by id',
  })
  @ApiOkResponse({
    type: GetProductResDto,
    description: 'Product successfully updated',
  })
  update(
    @Param('id') id: string,
    @Body() updateProductReqDto: UpdateProductReqDto,
  ) {
    return this.productService.update(id, updateProductReqDto);
  }

  @Put('image/:id')
  @ApiOperation({
    summary: 'Update product image',
    description: 'Update product image by id',
  })
  @ApiOkResponse({
    type: GetProductResDto,
    description: 'Product image successfully updated',
  })
  @ApiFile('image', false, {}, UpdateProductImageDto)
  updateImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242047 }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|png)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.productService.updateImage(id, image);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete product',
    description: 'Delete product by id',
  })
  @ApiOkResponse({
    type: GetProductResDto,
    description: 'Product successfully deleted',
  })
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
