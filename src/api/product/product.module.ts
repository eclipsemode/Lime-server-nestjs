import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DbService } from '@services/db/db.service';
import { FsService } from '@services/fs/fs.service';
import { TokenService } from '@services/token/token.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, DbService, FsService, TokenService],
})
export class ProductModule {}
