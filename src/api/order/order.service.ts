import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '@services/db/db.service';
import { CreateOrderDto } from '@api/order/dto/create-order-dto';
import { PromoCodeService } from '@api/promo-code/promo-code.service';
import { BranchService } from '@api/branch/branch.service';
import { UserService } from '@api/user/user.service';
import { ProductService } from '@api/product/product.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly dbService: DbService,
    private readonly promoCodeService: PromoCodeService,
    private readonly branchService: BranchService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  async getAll() {
    return this.dbService.order.findMany({
      include: {
        orderProducts: true,
      },
    });
  }

  async getOrdersByUserId(userId: string, page: number, size: number) {
    const foundUser = await this.dbService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!foundUser) {
      throw new NotFoundException({
        type: 'getOrdersByUserId',
        description: "Can't find user by id",
      });
    }

    return this.dbService.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        preOrderDate: 'desc',
      },
      include: {
        orderProducts: true,
        _count: true,
      },
    });
  }

  async get(id: string) {
    const foundOrder = await this.dbService.order.findUnique({
      where: {
        id,
      },
    });
    if (!foundOrder) {
      throw new NotFoundException({
        type: 'get',
        description: "Can't find order by id",
      });
    }

    return this.dbService.order.findUnique({
      where: {
        id,
      },
      include: {
        orderProducts: true,
      },
    });
  }

  async create(createOrderDto: CreateOrderDto) {
    const {
      orderProducts,
      payment,
      preOrderDate,
      totalPrice,
      totalAmount,
      channel,
      commentary,
      branchId,
      type,
      utensils,
      userId,
      promoCodeId,
      clientName,
      clientAddress,
      clientEntrance,
      clientFloor,
      clientRoom,
      clientTel,
    } = createOrderDto;

    try {
      const transaction = await this.dbService.$transaction(async (tx) => {
        const foundPromoCode = await this.promoCodeService.findPromoCode(
          promoCodeId,
          tx,
        );

        if (foundPromoCode) {
          await this.promoCodeService.use(promoCodeId);
        }

        const foundBranch = await this.branchService.findBranch(branchId, tx);

        if (!foundBranch) {
          throw new NotFoundException({
            type: 'create',
            description: "Can't find branch by branchId",
          });
        }

        const foundUser = await this.userService.findUserById(userId, tx);

        const createdOrder = await tx.order.create({
          data: {
            clientTel,
            clientName,
            clientAddress,
            clientEntrance,
            clientFloor,
            clientRoom,
            commentary,
            channel,
            branchId: foundBranch ? branchId : null,
            totalPrice,
            totalAmount,
            type,
            payment,
            utensils,
            userId: foundUser ? userId : null,
            promoCodeId: foundPromoCode ? promoCodeId : null,
            preOrderDate,
          },
        });

        const orderProductPromises = orderProducts.map(async (product) => {
          const foundProduct = await this.productService.findProductById(
            product.productId,
            tx,
          );

          if (!foundProduct) {
            throw new NotFoundException({
              type: 'create',
              description: 'Invalid product id',
            });
          }

          return tx.orderProduct.create({
            data: {
              price: product.price,
              image: foundProduct.image,
              isPizza: foundProduct.isPizza,
              sku: product.sku,
              amount: product.amount,
              productSize: product.productSize,
              productId: product.productId,
              categoryId: foundProduct.categoryId,
              rating: foundProduct.rating,
              name: foundProduct.name,
              description: foundProduct.description,
              orderId: createdOrder.id,
            },
          });
        });

        await Promise.all(orderProductPromises);

        return createdOrder;
      });

      return transaction;
    } catch (e) {
      throw new NotFoundException({
        type: 'create',
        description: "Can't create order, transaction error",
        error: e,
      });
    }
  }

  async delete(id: string) {
    const foundOrder = await this.dbService.order.findUnique({
      where: {
        id,
      },
    });

    if (!foundOrder) {
      throw new NotFoundException({
        type: 'delete',
        description: "Can't delete order, because it doesn't exist",
      });
    }

    return this.dbService.order.delete({
      where: {
        id,
      },
    });
  }
}
