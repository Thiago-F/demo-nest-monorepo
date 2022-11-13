import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './service/products.service';
import { ProductEntity } from './entity/product.entity';
import { ProductsController } from './controller/products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductService],
  controllers: [ProductsController]
})
export class ProductsModule { }
