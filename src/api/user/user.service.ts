import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserReqDto } from './dto/update-user-req.dto';
import { DbService } from '@services/db/db.service';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client/extension';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { UserEntity } from '@api/user/entities/user.entity';
import { UserRole } from '@api/user/types/user.type';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  findUserByPhone(tel: string) {
    const parsedTel = tel.replace('+', '');

    return this.dbService.user.findUnique({
      where: {
        tel: parsedTel,
      },
    });
  }

  async createUserWithTel(tel: string) {
    const parsedTel = tel.replace('+', '');

    const foundUser = await this.dbService.user.findUnique({
      where: {
        tel: parsedTel,
      },
    });

    if (foundUser) {
      throw new ConflictException({
        type: 'createUserWithTel',
        description: "Can't create user, because phone exists",
      });
    }

    return this.dbService.user.create({
      data: {
        tel: parsedTel,
      },
    });
  }

  findAll() {
    return this.dbService.user.findMany();
  }

  async findOne(id: string) {
    const foundUser = await this.dbService.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        order: true,
        bonus: true,
      },
    });

    if (!foundUser) {
      throw new NotFoundException({
        type: 'FindOne',
        description: "Couldn't find user.",
      });
    }

    return foundUser;
  }

  async getUserOrders(id: string) {
    return this.dbService.order.findMany({
      where: {
        userId: id,
      },
    });
  }

  async getUserBonuses(id: string) {
    return this.dbService.bonus.findMany({
      where: {
        userId: id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserReqDto) {
    const foundProfile = await this.dbService.profile.findUnique({
      where: {
        userId: id,
      },
    });

    if (!foundProfile) {
      throw new NotFoundException({
        type: 'Update',
        description: "Cannot find user's profile.",
      });
    }

    return this.dbService.profile.update({
      where: {
        userId: id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    const foundUser = await this.dbService.user.findUnique({
      where: {
        id,
      },
    });

    if (!foundUser) {
      throw new NotFoundException({
        type: 'remove',
        description: "Can't find user",
      });
    }

    return this.dbService.user.delete({
      where: {
        id,
      },
    });
  }

  async findUserById(
    userId: string,
    tx?: Omit<
      PrismaClient<Prisma.TransactionClient, never, DefaultArgs>,
      '$on' | '$connect' | '$disconnect' | '$use' | '$transaction' | '$extends'
    >,
  ): Promise<UserEntity | undefined> {
    if (!userId) {
      return undefined;
    }

    const foundUser = await (tx ? tx.user : this.dbService.user).findUnique({
      where: {
        id: userId,
      },
    });

    return foundUser
      ? { ...foundUser, role: foundUser.role as UserRole }
      : undefined;
  }
}
