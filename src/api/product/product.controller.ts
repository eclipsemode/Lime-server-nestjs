import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductReqDto } from './dto/create-product-req.dto';
import { CreateProductResDto } from './dto/create-product-res.dto';
import { ApiFile } from '@decorators/api-file.decorator';
import { GetProductResDto } from '@api/product/dto/get-product-res.dto';
import { SortOrder, SortType } from '@api/product/types/product.type';
import { UpdateProductReqDto } from '@api/product/dto/update-product-req.dto';
import { UpdateProductImageDto } from '@api/product/dto/update-productImage.dto';
import { Role } from '@api/user/role.decorator';
import { UserRole } from '@api/user/types/user.type';
import { RoleGuard } from '@api/user/role.guard';
import { ChangeOrderReqDto } from '@api/product/dto/change-order-req.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
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
    isArray: true,
  })
  get(
    @Query('categoryId') categoryId: string,
    @Query('sortBy') sortBy: SortType,
    @Query('sortOrder') sortOrder: SortOrder,
  ) {
    return this.productService.get(categoryId, sortBy, sortOrder);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
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
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
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

  @Post('change-order')
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({
    description: 'Order successfully changed',
    isArray: true,
  })
  @ApiOperation({
    summary: 'Change order products',
    description: 'Change order products',
  })
  changeOrder(@Body() changeOrderReqDto: ChangeOrderReqDto) {
    return this.productService.changeOrder(changeOrderReqDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
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
