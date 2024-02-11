import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TokenService } from '@services/token/token.service';
import { FsService } from '@services/fs/fs.service';
import { DbService } from '@services/db/db.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, DbService, FsService, TokenService],
})
export class CategoryModule {}
