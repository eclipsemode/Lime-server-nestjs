import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBranchReqDto } from './dto/create-branch-req.dto';
import { ChangeBranchReqDto } from './dto/change-branch-req.dto';
import { DbService } from '@services/db/db.service';

@Injectable()
export class BranchService {
  constructor(private readonly dbService: DbService) {}

  getAll() {
    return this.dbService.branch.findMany();
  }

  async create({ name }: CreateBranchReqDto) {
    const foundBranch = await this.dbService.branch.findUnique({
      where: {
        name,
      },
    });

    if (foundBranch) {
      throw new ConflictException({
        type: 'Create',
        description: "Can't create branch, because it already exists",
      });
    }

    return this.dbService.branch.create({
      data: {
        name,
      },
    });
  }

  async change({ name }: ChangeBranchReqDto, id: string) {
    const foundBranch = await this.dbService.branch.findUnique({
      where: {
        id,
      },
    });

    if (!foundBranch) {
      throw new NotFoundException({
        type: 'Change',
        description: "Can't find branch by id",
      });
    }

    const isNewBranchNameExists = await this.dbService.branch.findUnique({
      where: {
        name,
      },
    });

    if (isNewBranchNameExists) {
      throw new ConflictException({
        type: 'Change',
        description: 'New name already exists, please check another name',
      });
    }

    return this.dbService.branch.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async delete(id: string) {
    const foundBranch = await this.dbService.branch.findUnique({
      where: {
        id,
      },
    });

    if (!foundBranch) {
      throw new NotFoundException({
        type: 'Delete',
        description: "Can't find branch, please check another id",
      });
    }

    return this.dbService.branch.delete({
      where: {
        id,
      },
    });
  }
}
