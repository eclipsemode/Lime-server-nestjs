import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DbService } from '../db/db.service';
import { FsService } from '../fs/fs.service';
import { TokenService } from '../token/token.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, DbService, FsService, TokenService],
})
export class CategoryModule {}
