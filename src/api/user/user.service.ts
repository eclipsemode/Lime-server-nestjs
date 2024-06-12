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
      return this.dbService.profile.create({
        data: {
          userId: id,
          ...updateUserDto,
        },
      });
    }

    await this.dbService.profile.update({
      where: {
        userId: id,
      },
      data: updateUserDto,
    });

    return this.dbService.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
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

  async updateDateOfBirth(userId: string, newDateOfBirth: Date) {
    const foundUser = await this.dbService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });

    const foundUserDateOfBirth =
      await this.dbService.userDateOfBirth.findUnique({
        where: {
          profileId: foundUser.profile.id,
        },
      });

    if (!foundUser || !foundUser.profile) {
      throw new NotFoundException({
        type: 'updateDateOfBirth',
        description: "Can't find user",
      });
    }

    const days =
      Math.abs(
        new Date().getTime() -
          new Date(foundUserDateOfBirth.updatedAt).getTime(),
      ) /
      (1000 * 60 * 60 * 24);

    if (Math.floor(days) > 0) {
      throw new ConflictException({
        type: 'updateDateOfBirth',
        description: `Дату рождения можно менять раз в год. Осталось дней до разблокирования: ${Math.floor(
          days,
        )}`,
      });
    }

    const dateOfBirthUpdated = await this.dbService.userDateOfBirth.update({
      where: {
        profileId: foundUser.profile.id,
      },
      data: {
        date: new Date(newDateOfBirth),
      },
    });

    return dateOfBirthUpdated;
  }
}
