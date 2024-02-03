import { PickType } from '@nestjs/swagger';
import { BranchEntity } from '../entities/branch.entity';

export class CreateBranchReqDto extends PickType(BranchEntity, ['name']) {}
