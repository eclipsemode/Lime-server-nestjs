import { BranchEntity } from '../entities/branch.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateBranchReqDto extends OmitType(BranchEntity, [
  'id',
  'createdAt',
]) {}
