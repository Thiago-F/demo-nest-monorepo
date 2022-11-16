import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../../entities/user.entity';
import { SignupService } from '../../signup/service/signup.service';
import { LoginService } from './login.service';

jest.mock('bcrypt', () => ({
  compareSync: () => jest.fn()
}))

describe('LoginService', () => {
  let loginService: LoginService;
  let jwtService: JwtService;
  let sighUpService: SignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: SignupService,
          useValue: {
            findUserByEmail: jest.fn()
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('true')
          }
        }
      ],
    }).compile();

    loginService = module.get<LoginService>(LoginService);
    jwtService = module.get<JwtService>(JwtService);
    sighUpService = module.get<SignupService>(SignupService);
  });

  it('should be defined', () => {
    expect(loginService).toBeDefined();
  });

  describe('login', () => {
    it('should call a service with correct values', async () => {
      const userData = {
        client_id: 'any_id',
        client_secret: 'any_secret',
        email: 'any_email',
        name: 'any name'
      } as UserEntity

      const jwtSpy = jest.spyOn(jwtService, 'sign').mockReturnValueOnce('any_token')

      const result = await loginService.login(userData)

      expect(result).toBeDefined()
      expect(result).toEqual({
        token: 'any_token'
      })
      expect(jwtSpy).toHaveBeenCalledWith({
        client_id: 'any_id',
        email: 'any_email',
      })
    })

    it('should validate the user with the correct values', async () => {
      const userMockEntity = {
        client_id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        client_secret: 'any_secret',
      } as UserEntity

      jest.spyOn(sighUpService, 'findUserByEmail').mockResolvedValueOnce(userMockEntity)

      const result = await loginService.validateUser({ email: 'any_email@mail.com', password: 'any_password' })

      expect(result).toBeDefined()
      expect(result).toEqual(userMockEntity)
    })

    it('should return null if any user was found', async () => {
      jest.spyOn(sighUpService, 'findUserByEmail').mockImplementationOnce(() => { throw new Error('no user was found') })

      const result = await loginService.validateUser({ email: 'any_email@mail.com', password: 'any_password' })

      expect(result).toBeDefined()
      expect(result).toBeNull()
    })
  })
});
