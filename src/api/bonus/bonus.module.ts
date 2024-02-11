import { Module } from '@nestjs/common';
import { BonusService } from './bonus.service';
import { BonusController } from './bonus.controller';

@Module({
  controllers: [BonusController],
  providers: [BonusService],
})
export class BonusModule {}
