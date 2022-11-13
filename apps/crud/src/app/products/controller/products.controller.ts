import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SaveProductDto } from '../dto/save-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductService } from '../service/products.service';

@Controller('api/v1/product')
export class ProductsController {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Get()
    async findAll() {
        return this.productService.findAll()
    }

    @Post()
    async save(@Body() body: SaveProductDto) {
        return this.productService.save(body)
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.productService.findById({ where: { id } })
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateProductDto) {
        return this.productService.update(id, body)
    }

    @Delete(':id')
    async destroy(@Param('id') id: string) {
        return this.productService.destroy(id)
    }
}
