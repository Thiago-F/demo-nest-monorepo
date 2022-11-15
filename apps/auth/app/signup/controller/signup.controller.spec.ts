import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from './signup.controller';
import { UserEntity } from '../../entities/user.entity';
import { SignupService } from '../service/signup.service';

describe('SignupController', () => {
  let signupController: SignupController;
  let signupService: SignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignupController],
      providers: [
        {
          provide: SignupService,
          useValue: {
            signup: jest.fn()
          }
        }
      ]
    }).compile();

    signupController = module.get<SignupController>(SignupController);
    signupService = module.get<SignupService>(SignupService);
  });

  it('should be defined', () => {
    expect(signupController).toBeDefined();
  });

  describe('signup', () => {
    it('should call signup service and store a user with success', async () => {
      const body = {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password'
      }

      const userMock = {
        client_id: 'any_id',
        name: 'user_name',
        email: 'user_email@mail.com',
        client_secret: 'user_secret'
      } as UserEntity

      jest.spyOn(signupService, 'signup').mockResolvedValueOnce(userMock)

      const result = await signupController.signup(body)

      expect(result).toBeDefined()
      expect(signupService.signup).toBeCalledTimes(1)
    })
  })
});
