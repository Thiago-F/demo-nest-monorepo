import { Test, TestingModule } from '@nestjs/testing';
import { SaveProductDto } from '../dto/save-product.dto';
import { ProductEntity } from '../entity/product.entity';
import { ProductsController } from './products.controller';
import { ProductService } from '../service/products.service'
import { UpdateProductDto } from '../dto/update-product.dto';

describe('ProductsController', () => {
  let productController: ProductsController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            save: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
          }
        }
      ]
    }).compile();

    productController = module.get<ProductsController>(ProductsController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('list and find', () => {
    it('should list all products', async () => {
      const mockProductEntity = {
        name: 'any_product',
        category: 'any_category',
        value: 12345
      } as ProductEntity

      jest.spyOn(productService, 'findAll').mockResolvedValueOnce([mockProductEntity])

      const result = await productController.findAll()

      expect(result).toEqual([mockProductEntity])
      expect(productService.findAll).toBeCalledTimes(1)
    })

    it('should find a product by id', async () => {
      const mockProductEntity = {
        name: 'any_product',
        category: 'any_category',
        value: 12345
      } as ProductEntity

      jest.spyOn(productService, 'findById').mockResolvedValueOnce(mockProductEntity)

      const result = await productController.findById('any_id')

      expect(result).toEqual(mockProductEntity)
      expect(productService.findById).toBeCalledTimes(1)
    })
  })

  describe('save', () => {
    it('should create a new product on success', async () => {
      const body: SaveProductDto = {
        name: 'any_product',
        category: 'any_category',
        value: 12345
      }

      const mockProductEntity = {
        ...body
      } as ProductEntity

      jest.spyOn(productService, 'save').mockResolvedValueOnce(mockProductEntity)

      const result = await productController.save(body)

      expect(result).toBeDefined()
      expect(productService.save).toHaveBeenCalledWith(body)
    })
  })

  describe('update', () => {
    it('should update a product based on data passed', async () => {
      const body: UpdateProductDto = {
        name: 'any_product',
        category: 'any_category',
        value: 12345
      }

      const mockProductEntity = {
        ...body
      } as ProductEntity

      jest.spyOn(productService, 'update').mockResolvedValueOnce(mockProductEntity)

      const result = await productController.update('any_id', body)

      expect(result).toBeDefined()
      expect(productService.update).toHaveBeenCalledWith('any_id', body)
    })
  })

  describe('delete', () => {
    it('should delete a product by id', async () => {
      await productController.destroy('any_id')
      expect(productService.destroy).toBeCalledTimes(1)
    })
  })
});
