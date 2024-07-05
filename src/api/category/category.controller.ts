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
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetCategoriesResDto } from './dto/get-categories-res.dto';
import { CreateCategoryReqDto } from './dto/create-category-req.dto';
import { CreateCategoryResDto } from './dto/create-category-res.dto';
import { DeleteCategoryResDto } from './dto/delete-category-res.dto';
import { UpdateCategoryReqDto } from './dto/update-category-req.dto';
import { UpdateCategoryResDto } from './dto/update-category-res.dto';
import { ChangeOrderCategoryResDto } from './dto/changeOrder-category-res.dto';
import { UserRole } from '@api/user/types/user.type';
import { RoleGuard } from '@api/user/role.guard';
import { Role } from '@api/user/role.decorator';
import { ApiFile } from '@decorators/api-file.decorator';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all categories',
    description: 'Get all categories in array',
  })
  @ApiFoundResponse({
    type: GetCategoriesResDto,
    description: 'List of categories',
    isArray: true,
  })
  getAll() {
    return this.categoryService.getAll();
  }

  @Post()
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create category', description: 'Create category' })
  @ApiFile('image', false, { name: { type: 'string' } }, CreateCategoryReqDto)
  @ApiCreatedResponse({
    type: CreateCategoryResDto,
    description: 'Category successfully created',
  })
  create(
    @Body() createCategoryReqDto: CreateCategoryReqDto,
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
    return this.categoryService.create(createCategoryReqDto, image);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update category name',
    description: 'Update category name',
  })
  @ApiOkResponse({
    type: UpdateCategoryResDto,
    description: 'Category successfully updated',
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryReqDto: UpdateCategoryReqDto,
  ) {
    return this.categoryService.update(id, updateCategoryReqDto.name);
  }

  @Get('test')
  test() {
    return 'Hello Test';
  }

  @Patch(':id/image')
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update category image',
    description: 'Update category image',
  })
  @ApiFile('image', false, { name: { type: 'string' } }, UpdateCategoryReqDto)
  @ApiOkResponse({
    type: UpdateCategoryResDto,
    description: 'Category image successfully updated',
  })
  updateCategoryImage(
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
    return this.categoryService.updateCategoryImage(id, image);
  }

  @Post('change-order')
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Change order category',
    description: 'Change order category',
  })
  @ApiOkResponse({
    type: ChangeOrderCategoryResDto,
    description: 'Category successfully updated',
    isArray: true,
  })
  changeOrder(@Body() newOrderArr: string[]) {
    return this.categoryService.changeOrder(newOrderArr);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete category', description: 'Delete category' })
  @ApiOkResponse({
    type: DeleteCategoryResDto,
    description: 'Successfully deleted',
  })
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
