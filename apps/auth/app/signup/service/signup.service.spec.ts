import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { SignUpDto } from '../dto/signup.dto';
import { SignupService } from './signup.service';

describe('SignupService', () => {
  let signupService: SignupService;
  let signupRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignupService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn()
          }
        }
      ],
    }).compile();

    signupService = module.get<SignupService>(SignupService);
    signupRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(signupService).toBeDefined();
  });

  describe('signup', () => {
    it('should create an user with correct values', async () => {
      const data: SignUpDto = {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password',
      }

      const userMockEntity = {
        client_id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        client_secret: 'any_secret',
      } as UserEntity

      jest.spyOn(signupRepository, 'create').mockReturnValueOnce(userMockEntity)
      jest.spyOn(signupRepository, 'save').mockResolvedValueOnce(userMockEntity)

      const result = await signupService.signup(data)

      expect(result).toBeDefined()
      expect(result).toEqual(userMockEntity)
    })


    it('should throw an UnauthorizedError if password does not match', async () => {
      const body = {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmPassword: 'other_password'
      }

      const promise = signupService.signup(body)

      await expect(promise).rejects.toThrow()
    })
  })
});
