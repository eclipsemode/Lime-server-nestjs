import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { DbService } from '../db/db.service';
import { TokenService } from '../token/token.service';

@Module({
  controllers: [BranchController],
  providers: [BranchService, DbService, TokenService],
})
export class BranchModule {}
