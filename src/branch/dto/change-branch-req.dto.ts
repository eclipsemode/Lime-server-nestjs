import { PickType } from '@nestjs/swagger';
import { BranchEntity } from '../entities/branch.entity';

export class ChangeBranchReqDto extends PickType(BranchEntity, ['name']) {}
