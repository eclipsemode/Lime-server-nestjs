import { PickType } from '@nestjs/swagger';
import { UserDateOfBirthEntity } from '@api/user/entities/userDateOfBirth.entity';

export class UpdateDateOfBirthReqDto extends PickType(UserDateOfBirthEntity, [
  'date',
]) {}
