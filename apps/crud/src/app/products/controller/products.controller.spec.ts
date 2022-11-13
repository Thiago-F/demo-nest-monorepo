import { Test, TestingModule } from '@nestjs/testing';
import { SaveProductDto } from '../dto/save-product.dto';
import { ProductEntity } from '../entity/product.entity';
import { ProductsController } from './products.controller';
import { ProductService } from '../service/products.service'

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
            save: jest.fn()
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
});
