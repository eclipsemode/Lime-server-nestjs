import { PartialType } from '@nestjs/swagger';
import { ProfileEntity } from '../entities/profile.entity';

export class UpdateUserReqDto extends PartialType(ProfileEntity) {}
