import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaveProductDto } from '../dto/save-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entity/product.entity';
import { ProductService } from '../service/products.service';
import { InvalidParamsPattern, UnauthorizedParamsPattern } from '../swagger/response-patterns.swagger'

@Controller('api/v1/product')
@UseGuards(AuthGuard('jwt'))
@ApiTags('products')
@ApiBearerAuth()
export class ProductsController {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Get()
    @ApiOperation({
        summary: 'Listar todos os produtos'
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de produtos retornada com sucesso',
        type: ProductEntity,
        isArray: true
    })
    @ApiResponse({
        status: 401,
        description: 'Requisição não autorizada',
        type: UnauthorizedParamsPattern
    })
    async findAll() {
        return this.productService.findAll()
    }

    @Post()
    @ApiOperation({
        summary: 'adicionar um novo produto'
    })
    @ApiResponse({
        status: 200,
        description: 'Novo produto criado com sucesso',
        type: ProductEntity,
    })
    @ApiResponse({
        status: 400,
        description: 'Parametros inválidos',
        type: InvalidParamsPattern
    })
    @ApiResponse({
        status: 401,
        description: 'Requisição não autorizada',
        type: UnauthorizedParamsPattern
    })
    async save(@Body() body: SaveProductDto) {
        return this.productService.save(body)
    }

    @Get(':id')
    @ApiOperation({ summary: 'buscar um produto pelo id' })
    @ApiResponse({
        status: 200,
        description: 'Produto encontrado via id com sucesso',
        type: ProductEntity,
    })
    @ApiResponse({
        status: 401,
        description: 'Requisição não autorizada',
        type: UnauthorizedParamsPattern
    })
    async findById(@Param('id') id: string) {
        return this.productService.findById({ where: { id } })
    }

    @Put(':id')
    @ApiOperation({ summary: 'fazer edição de algum produto via id' })
    @ApiResponse({
        status: 200,
        description: 'Produto alterado com sucesso',
        type: ProductEntity,
    })
    @ApiResponse({
        status: 400,
        description: 'Parametros inválidos',
        type: InvalidParamsPattern
    })
    @ApiResponse({
        status: 401,
        description: 'Requisição não autorizada',
        type: UnauthorizedParamsPattern
    })
    async update(@Param('id') id: string, @Body() body: UpdateProductDto) {
        return this.productService.update(id, body)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'deletar um produto via id' })
    @ApiResponse({
        status: 200,
        description: 'Produto removido com sucesso'
    })
    @ApiResponse({
        status: 401,
        description: 'Requisição não autorizada',
        type: UnauthorizedParamsPattern
    })
    async destroy(@Param('id') id: string) {
        await this.productService.destroy(id)
    }
}
