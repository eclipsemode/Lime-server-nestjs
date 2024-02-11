import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryReqDto } from './dto/create-category-req.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateCategoryReqDto } from './dto/update-category-req.dto';
import { FsService } from '@services/fs/fs.service';
import { DbService } from '@services/db/db.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly dbService: DbService,
    private readonly fsService: FsService,
  ) {}

  getAll() {
    return this.dbService.category.findMany();
  }

  async create({ name }: CreateCategoryReqDto, image?: Express.Multer.File) {
    const foundCategory = await this.dbService.category.findUnique({
      where: {
        name,
      },
    });

    if (foundCategory) {
      throw new ConflictException({
        type: 'create',
        description: "Can't create category. This name already exists",
      });
    }

    const fileName = uuidv4() + '.jpg';

    if (image) {
      await this.fsService.saveFile('images/category', fileName, image.buffer);
    }

    return this.dbService.category.create({
      data: {
        name,
        image: image ? fileName : null,
      },
    });
  }

  async update(
    id: string,
    { name }: UpdateCategoryReqDto,
    image: Express.Multer.File,
  ) {
    if (name) {
      const isNameExist = await this.dbService.category.findUnique({
        where: {
          name,
        },
      });

      if (isNameExist) {
        throw new ConflictException({
          type: 'update',
          description: 'Current category name already exists',
        });
      }
    }

    const foundCategoryWithId = await this.dbService.category.findUnique({
      where: {
        id,
      },
    });

    if (!foundCategoryWithId) {
      throw new NotFoundException({
        type: 'update',
        description: "Can't find category by id",
      });
    }

    const fileName = uuidv4() + '.jpg';

    if (image) {
      await this.fsService.deleteFile(
        'images/category',
        foundCategoryWithId.image,
      );
      await this.fsService.saveFile('images/category', fileName, image.buffer);
    }

    return this.dbService.category.update({
      where: {
        id,
      },
      data: {
        name: name ? name : foundCategoryWithId.name,
        image: image ? fileName : foundCategoryWithId.image,
      },
    });
  }

  async delete(id: string) {
    const foundCategory = await this.dbService.category.findUnique({
      where: {
        id,
      },
    });

    if (!foundCategory) {
      throw new NotFoundException({
        type: 'delete',
        description: "Can't find category",
      });
    }

    await this.fsService.deleteFile('images/category', foundCategory.image);

    return this.dbService.category.delete({
      where: {
        id,
      },
    });
  }

  async changeOrder(newOrderArr: string[]) {
    if (newOrderArr.length === 0) {
      return;
    }

    const categoryPromises = newOrderArr.map(async (categoryId, index) => {
      const foundCategory = await this.dbService.category.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!foundCategory) {
        throw new NotFoundException({
          type: 'changeOrder',
          description: "Can't find category by id: " + categoryId,
        });
      }

      return this.dbService.category.update({
        where: {
          id: categoryId,
        },
        data: {
          orderIndex: index + 1,
        },
      });
    });

    await Promise.all(categoryPromises);

    return this.dbService.category.findMany();
  }
}
