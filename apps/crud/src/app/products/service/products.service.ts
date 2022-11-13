import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { SaveProductDto } from '../dto/save-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entity/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) { }

    async findAll(): Promise<any> {
        return this.productRepository.find({
            select: ['id', 'name', 'category', 'value']
        })
    }

    async save({ name, value, category }: SaveProductDto): Promise<ProductEntity> {
        const product = this.productRepository.create({ name, value, category })
        return this.productRepository.save(product)
    }

    async findById(options: FindOneOptions<ProductEntity>): Promise<ProductEntity> {
        try {
            return this.productRepository.findOneOrFail(options)
        } catch (error) {
            throw new NotFoundException(error.message)
        }
    }

    async update(id: string, data: UpdateProductDto): Promise<ProductEntity> {
        const product = await this.findById({ where: { id } })
        this.productRepository.merge(product, data)
        return this.productRepository.save(product)
    }

    async destroy(id: string) {
        await this.findById({ where: { id } })
        return this.productRepository.softDelete({ id })
    }
}
