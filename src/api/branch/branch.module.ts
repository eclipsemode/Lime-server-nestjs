import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { DbService } from '@services/db/db.service';
import { TokenService } from '@services/token/token.service';

@Module({
  controllers: [BranchController],
  providers: [BranchService, DbService, TokenService],
})
export class BranchModule {}
