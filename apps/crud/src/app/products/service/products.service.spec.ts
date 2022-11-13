import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from './products.service';
import { ProductEntity } from '../entity/product.entity';
import { SaveProductDto } from '../dto/save-product.dto';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          }
        }
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  describe('save', () => {
    it('should call productRepository with correct values', async () => {
      const data: SaveProductDto = {
        name: 'any_name',
        category: 'any_category',
        value: 12345,
      }

      const productEntityMock = {
        ...data
      } as ProductEntity

      jest.spyOn(productRepository, 'create').mockReturnValueOnce(productEntityMock)
      jest.spyOn(productRepository, 'save').mockResolvedValueOnce(productEntityMock)

      const result = await productService.save(data)

      expect(result).toBeDefined()
      expect(productRepository.create).toBeCalledTimes(1)
      expect(productRepository.save).toBeCalledTimes(1)
    })
  })
});
