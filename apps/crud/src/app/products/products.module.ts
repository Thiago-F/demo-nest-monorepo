import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './service/products.service';
import { ProductEntity } from './entity/product.entity';
import { ProductsController } from './controller/products.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    JwtModule.register({
      privateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [ProductsController],
  providers: [ProductService, JwtStrategy],
})
export class ProductsModule { }
