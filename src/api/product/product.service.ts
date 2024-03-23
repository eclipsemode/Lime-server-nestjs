import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductReqDto } from './dto/create-product-req.dto';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '@services/db/db.service';
import { FsService } from '@services/fs/fs.service';
import { SortOrder, SortType } from '@api/product/types/product.type';
import { UpdateProductReqDto } from '@api/product/dto/update-product-req.dto';
import { ChangeOrderReqDto } from '@api/product/dto/change-order-req.dto';

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
      productSizes,
      productPrices,
      productSkus,
      categoryId,
      rating,
      isPizza,
    }: CreateProductReqDto,
    image?: Express.Multer.File,
  ) {
    const foundCategory = await this.dbService.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    for (const sku of productSkus) {
      const foundSku = await this.dbService.productSize.findUnique({
        where: {
          sku,
        },
      });

      if (foundSku) {
        throw new BadRequestException({
          type: 'create',
          description: "Can't create product, because SKU already exists",
        });
      }
    }

    if (!foundCategory) {
      throw new NotFoundException({
        type: 'create',
        description: "Can't create product, because not found category by id",
      });
    }

    const productSizeArr = [];

    productSizes.forEach((item, index) => {
      productSizeArr.push({
        name: productSizes[index],
        price: productPrices[index],
        sku: productSkus[index] ?? null,
      });
    });

    const fileName = uuidv4() + '.jpg';

    if (image) {
      await this.fsService.saveFile('images/products', fileName, image.buffer);
    }

    try {
      const transaction = this.dbService.$transaction(async (tx) => {
        const newProduct = await tx.product.create({
          data: {
            name,
            description,
            categoryId,
            rating: rating > 10 ? 10 : rating < 1 ? 1 : rating,
            image: image ? fileName : null,
            isPizza,
          },
        });

        const productSizePromises = productSizes.map(async (_, index) => {
          return tx.productSize.create({
            data: {
              productId: newProduct.id,
              name: productSizes[index],
              price: productPrices[index],
              sku: productSkus[index] ?? null,
            },
          });
        });

        await Promise.all(productSizePromises);

        return tx.product.findUnique({
          where: {
            id: newProduct.id,
          },
          include: {
            productSize: {
              where: {
                productId: newProduct.id,
              },
            },
          },
        });
      });

      return transaction;
    } catch (e) {
      throw new NotFoundException({
        type: 'create',
        description: "Can't create product",
        error: e,
      });
    }
  }

  async get(
    categoryId: string,
    sortBy: SortType = SortType.ORDER_INDEX,
    sortOrder: SortOrder = SortOrder.ASC,
  ) {
    if (sortBy === SortType.PRICE) {
      if (categoryId) {
        switch (sortOrder) {
          case SortOrder.DESC:
            return this.dbService.$queryRaw`
              SELECT products.*,
               json_agg(json_build_object('id', "productSizes"."id", 'name', "productSizes".name, 'price', "productSizes".price, 'sku', "productSizes".sku) ORDER BY "productSizes".price ASC) AS "productSize"
              FROM products
              JOIN "productSizes" ON products.id = "productSizes"."productId"
              WHERE "categoryId"=${categoryId}
              GROUP BY products.id
              ORDER BY (SELECT "productSizes"."price" FROM "productSizes" WHERE "productSizes"."productId" = products.id ORDER BY "productSizes"."price" LIMIT 1) DESC;
      `;
          default:
            return this.dbService.$queryRaw`
              SELECT products.*,
               json_agg(json_build_object('id', "productSizes"."id", 'name', "productSizes".name, 'price', "productSizes".price, 'sku', "productSizes".sku) ORDER BY "productSizes".price ASC) AS "productSize"
              FROM products
              JOIN "productSizes" ON products.id = "productSizes"."productId"
              WHERE "categoryId"=${categoryId}
              GROUP BY products.id
              ORDER BY (SELECT "productSizes"."price" FROM "productSizes" WHERE "productSizes"."productId" = products.id ORDER BY "productSizes"."price" LIMIT 1) ASC;
      `;
        }
      } else {
        switch (sortOrder) {
          case SortOrder.DESC:
            return this.dbService.$queryRaw`
              SELECT products.*,
               json_agg(json_build_object('id', "productSizes"."id", 'name', "productSizes".name, 'price', "productSizes".price, 'sku', "productSizes".sku) ORDER BY "productSizes".price ASC) AS "productSize"
              FROM products
              JOIN "productSizes" ON products.id = "productSizes"."productId"
              GROUP BY products.id
              ORDER BY (SELECT "productSizes"."price" FROM "productSizes" WHERE "productSizes"."productId" = products.id ORDER BY "productSizes"."price" LIMIT 1) DESC;
      `;
          default:
            return this.dbService.$queryRaw`
              SELECT products.*,
               json_agg(json_build_object('id', "productSizes"."id", 'name', "productSizes".name, 'price', "productSizes".price, 'sku', "productSizes".sku) ORDER BY "productSizes".price ASC) AS "productSize"
              FROM products
              JOIN "productSizes" ON products.id = "productSizes"."productId"
              GROUP BY products.id
              ORDER BY (SELECT "productSizes"."price" FROM "productSizes" WHERE "productSizes"."productId" = products.id ORDER BY "productSizes"."price" LIMIT 1) ASC;
      `;
        }
      }
    } else {
      return this.dbService.product.findMany({
        where: {
          categoryId,
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          productSize: true,
        },
      });
    }
  }

  async update(id: string, updateProductReqDto: UpdateProductReqDto) {
    const foundProduct = await this.dbService.product.findUnique({
      where: {
        id,
      },
    });

    if (!foundProduct) {
      throw new NotFoundException({
        type: 'update',
        description: 'Can not find product by id',
      });
    }

    try {
      const transaction = await this.dbService.$transaction(async (tx) => {
        await tx.product.update({
          where: {
            id,
          },
          data: {
            name: updateProductReqDto.name
              ? updateProductReqDto.name
              : foundProduct.name,
            description: updateProductReqDto.description
              ? updateProductReqDto.description
              : foundProduct.description,
            categoryId: updateProductReqDto.categoryId
              ? updateProductReqDto.categoryId
              : foundProduct.categoryId,
            rating: updateProductReqDto.rating
              ? updateProductReqDto.rating
              : foundProduct.rating,
            isPizza: updateProductReqDto.isPizza
              ? updateProductReqDto.isPizza
              : foundProduct.isPizza,
          },
        });

        await tx.productSize.deleteMany({
          where: {
            productId: id,
          },
        });

        const productSizePromises = updateProductReqDto.productSize.map(
          async (productSize) => {
            return tx.productSize.create({
              data: {
                productId: id,
                name: productSize.name,
                price: productSize.price,
                sku: productSize.sku,
              },
            });
          },
        );

        await Promise.all(productSizePromises);

        return tx.product.findUnique({
          where: {
            id,
          },
          include: {
            productSize: {
              where: {
                productId: id,
              },
            },
          },
        });
      });

      return transaction;
    } catch (e) {
      throw new NotFoundException({
        type: 'update',
        description: "Can't update product",
        error: e,
      });
    }
  }

  async updateImage(id: string, image: Express.Multer.File) {
    const foundProduct = await this.dbService.product.findUnique({
      where: {
        id,
      },
    });

    if (!foundProduct) {
      throw new NotFoundException({
        type: 'updateImage',
        description: "Can't find product by id",
      });
    }

    if (foundProduct.image) {
      await this.fsService.deleteFile('images/products', foundProduct.image);
    }

    const fileName = uuidv4() + '.jpg';

    await this.fsService.saveFile('images/products', fileName, image.buffer);

    return this.dbService.product.update({
      where: {
        id,
      },
      data: {
        image: fileName,
      },
    });
  }

  async changeOrder(changeOrderReqDto: ChangeOrderReqDto) {
    const { orderArr } = changeOrderReqDto;

    const changeOrderPromises = orderArr.map(async (product) => {
      const foundProduct = await this.dbService.product.findUnique({
        where: {
          id: product.id,
        },
      });

      if (!foundProduct) {
        throw new NotFoundException({
          type: 'changeOrder',
          description: 'Can not find product by id',
        });
      }

      return this.dbService.product.update({
        where: {
          id: product.id,
        },
        data: {
          orderIndex: product.orderIndex,
        },
      });
    });

    await Promise.all(changeOrderPromises);
  }

  async delete(id: string) {
    const foundProduct = await this.dbService.product.findUnique({
      where: {
        id,
      },
    });

    if (!foundProduct) {
      throw new NotFoundException({
        type: 'delete',
        description: 'Can not find product by id',
      });
    }

    if (foundProduct.image) {
      await this.fsService.deleteFile('images/products', foundProduct.image);
    }

    return this.dbService.product.delete({
      where: {
        id,
      },
      include: {
        productSize: {
          where: {
            productId: foundProduct.id,
          },
        },
      },
    });
  }
}
