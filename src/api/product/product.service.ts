import { Injectable } from '@nestjs/common';
import { CreateProductReqDto } from './dto/create-product-req.dto';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '@services/db/db.service';
import { FsService } from '@services/fs/fs.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly dbService: DbService,
    private readonly fsService: FsService,
  ) {}
  async create(
    {
      name,
      description,
      productSize,
      categoryId,
      rating,
      orderIndex,
    }: CreateProductReqDto,
    image?: Express.Multer.File,
  ) {
    const fileName = uuidv4() + '.jpg';

    if (image) {
      await this.fsService.saveFile('images/products', fileName, image.buffer);
    }

    await this.dbService.product.create({
      data: {
        name,
        description,
        categoryId,
        rating,
        orderIndex,
        image: fileName,
        productSize: {
          createMany: {
            data: productSize,
          },
        },
      },
      include: {
        productSize: true,
      },
    });
  }
}
