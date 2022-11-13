import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from './products.service';
import { ProductEntity } from '../entity/product.entity';
import { SaveProductDto } from '../dto/save-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

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
            find: jest.fn(),
            findOneOrFail: jest.fn(),
            merge: jest.fn(),
            softDelete: jest.fn(),
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

  describe('list and find', () => {
    it('should list all products', async () => {
      const mockProductEntity = {
        name: 'any_product',
        category: 'any_category',
        value: 12345
      } as ProductEntity

      jest.spyOn(productRepository, 'find').mockResolvedValueOnce([mockProductEntity])

      const result = await productService.findAll()

      expect(result).toEqual([mockProductEntity])
      expect(productRepository.find).toBeCalledTimes(1)
    })

    it('should find a product by id', async () => {
      const mockProductEntity = {
        name: 'any_product',
        category: 'any_category',
        value: 12345
      } as ProductEntity

      jest.spyOn(productRepository, 'findOneOrFail').mockResolvedValueOnce(mockProductEntity)

      const result = await productService.findById({ where: { id: 'any_id' } })

      expect(result).toEqual(mockProductEntity)
      expect(productRepository.findOneOrFail).toBeCalledTimes(1)
    })

    it('should throw if no product was found', async () => {
      jest.spyOn(productRepository, 'findOneOrFail').mockImplementationOnce(() => { throw new Error('No product was found') })

      const promise = productService.findById({ where: { id: 'any_id' } })

      await expect(promise).rejects.toThrow()
    })
  })

  describe('save', () => {
    it('should save a productRepository.create with correct values', async () => {
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

  describe('update', () => {
    it('should call productRepository.update with correct values', async () => {
      const data: UpdateProductDto = {
        name: 'any_name',
        category: 'any_category',
        value: 12345,
      }

      const productEntityMock = {
        ...data
      } as ProductEntity

      jest.spyOn(productRepository, 'findOneOrFail').mockResolvedValueOnce(productEntityMock)
      jest.spyOn(productRepository, 'merge').mockReturnValueOnce(productEntityMock)
      jest.spyOn(productRepository, 'save').mockResolvedValueOnce(productEntityMock)

      const result = await productService.update('any_id', data)

      expect(result).toBeDefined()
      expect(productRepository.merge).toBeCalledTimes(1)
      expect(productRepository.save).toBeCalledTimes(1)
    })
  })

  describe('destroy', () => {
    it('should call productRepository.destroy with correct values', async () => {
      await productService.destroy('any_id')
      expect(productRepository.softDelete).toBeCalledTimes(1)
    })
  })
});
