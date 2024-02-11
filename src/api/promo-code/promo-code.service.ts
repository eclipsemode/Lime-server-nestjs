import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PromoCodeCreateReqDto } from './dto/promoCode-create-req.dto';
import { PromoCodeChangeReqDto } from './dto/promoCode-change-req.dto';
import { DbService } from '@services/db/db.service';

@Injectable()
export class PromoCodeService {
  constructor(private readonly dbService: DbService) {}

  getAll() {
    return this.dbService.promoCode.findMany();
  }

  async create(promoCodeCreateReqDto: PromoCodeCreateReqDto) {
    const { code, type, limit, discount } = promoCodeCreateReqDto;
    const foundCode = await this.dbService.promoCode.findUnique({
      where: {
        code,
      },
    });

    if (foundCode) {
      throw new InternalServerErrorException({
        type: 'create',
        description: "Can't create code, because it already exists",
      });
    }

    return this.dbService.promoCode.create({
      data: {
        code,
        type,
        limit,
        discount,
      },
    });
  }

  async change(
    id: string,
    { code, type, limit, discount }: PromoCodeChangeReqDto,
  ) {
    const foundPromoCode = await this.dbService.promoCode.findUnique({
      where: {
        id,
      },
    });

    if (!foundPromoCode) {
      throw new NotFoundException({
        type: 'change',
        description: "Can't find code by id",
      });
    }

    return this.dbService.promoCode.update({
      where: {
        id,
      },
      data: {
        code,
        type,
        limit,
        discount,
      },
    });
  }

  async delete(id: string) {
    const foundPromoCode = await this.dbService.promoCode.findUnique({
      where: {
        id,
      },
    });

    if (!foundPromoCode) {
      throw new NotFoundException({
        type: 'delete',
        description: "Can't find promo code by id",
      });
    }

    return this.dbService.promoCode.delete({
      where: {
        id,
      },
    });
  }

  async use(id: string) {
    const foundPromoCode = await this.dbService.promoCode.findUnique({
      where: {
        id,
      },
    });

    if (!foundPromoCode) {
      throw new NotFoundException({
        type: 'use',
        description: "Can't find promo code by id",
      });
    }

    if (foundPromoCode.limit < 1) {
      await this.dbService.promoCode.delete({
        where: {
          id,
        },
      });
      throw new NotFoundException({
        type: 'use',
        description: "Promo code can't be used",
      });
    }

    if (foundPromoCode.limit <= 1) {
      return this.dbService.promoCode.delete({
        where: {
          id,
        },
      });
    } else {
      return this.dbService.promoCode.update({
        where: {
          id,
        },
        data: {
          limit: foundPromoCode.limit - 1,
        },
      });
    }
  }

  async check(code: string) {
    const foundPromoCode = await this.dbService.promoCode.findUnique({
      where: {
        code,
      },
    });

    if (!foundPromoCode) {
      throw new NotFoundException({
        type: 'check',
        description: "This promo code doesn't exist",
      });
    } else if (foundPromoCode.limit < 1) {
      throw new NotFoundException({
        type: 'check',
        description: "This promo code can't be used",
      });
    }

    return foundPromoCode;
  }
}
