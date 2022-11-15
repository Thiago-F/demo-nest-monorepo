import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginDto } from '../dto/login.dto';
import { LoginService } from '../service/login.service';

describe('LoginController', () => {
  let loginController: LoginController;
  let loginService: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useValue: {
            login: jest.fn()
          }
        }
      ]
    }).compile();

    loginController = module.get<LoginController>(LoginController);
    loginService = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(loginController).toBeDefined();
  });

  describe('login', () => {
    it('should return a token with correct values', async () => {
      const body: LoginDto = {
        email: 'any_email@mail.com',
        password: 'any_password'
      }

      const request = {}

      jest.spyOn(loginService, 'login').mockResolvedValueOnce({ token: 'valid_token' })

      const result = await loginController.login(body, request)

      expect(result).toBeDefined()
      expect(result).toEqual({
        token: 'valid_token'
      })
    })
  })
});
