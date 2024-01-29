import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserReqDto } from './dto/update-user-req.dto';
import { DbService } from '../db/db.service';

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

  createUserWithTel(tel: string) {
    const parsedTel = tel.replace('+', '');

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

  remove(id: string) {
    return this.dbService.user.delete({
      where: {
        id,
      },
    });
  }
}
