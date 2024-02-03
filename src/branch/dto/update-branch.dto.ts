import { PartialType } from '@nestjs/swagger';
import { CreateBranchReqDto } from './create-branch-req.dto';

export class UpdateBranchDto extends PartialType(CreateBranchReqDto) {}
