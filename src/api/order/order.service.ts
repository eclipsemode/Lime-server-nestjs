import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '@services/db/db.service';
import { CreateOrderDto } from '@api/order/dto/create-order-dto';
import { PromoCodeService } from '@api/promo-code/promo-code.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly dbService: DbService,
    private readonly promoCodeService: PromoCodeService,
  ) {}

  async getAll() {
    return this.dbService.order.findMany({
      include: {
        orderProduct: true,
      },
    });
  }

  async getOrdersByUserId(userId: string) {
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
      include: {
        orderProduct: true,
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
        orderProduct: true,
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
      clientEmail,
      clientAddress,
      clientEntrance,
      clientFloor,
      clientRoom,
      clientTel,
    } = createOrderDto;

    if (
      orderProducts.length === 0 ||
      !payment ||
      !totalAmount ||
      !channel ||
      !branchId ||
      !clientName ||
      !clientTel
    ) {
      throw new NotFoundException({
        type: 'create',
        description: "Can't create order. Required data is not provided",
      });
    }

    try {
      const transaction = await this.dbService.$transaction(async (tx) => {
        const foundPromoCode = await tx.promoCode.findUnique({
          where: {
            id: promoCodeId,
          },
        });

        if (foundPromoCode) {
          await this.promoCodeService.use(promoCodeId);
        }

        const foundBranch = await tx.branch.findUnique({
          where: {
            id: branchId,
          },
        });

        const foundUser = await tx.user.findFirst({
          where: {
            id: userId,
          },
        });

        const createdOrder = await tx.order.create({
          data: {
            clientTel,
            clientName,
            clientAddress,
            clientEntrance,
            clientFloor,
            clientRoom,
            clientEmail,
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
          const foundProduct = await tx.product.findUnique({
            where: {
              id: product.productId,
            },
          });

          if (!foundProduct) {
            throw new NotFoundException({
              type: 'create',
              description: 'Invalid product id',
            });
          }

          return await tx.orderProduct.create({
            data: {
              price: product.price,
              image: foundProduct.image,
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

        return tx.order.findUnique({
          where: {
            id: createdOrder.id,
          },
          include: {
            orderProduct: {
              where: {
                orderId: createdOrder.id,
              },
            },
          },
        });
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
