import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoginController } from './controller/login.controller';
import { LoginService } from './service/login.service';
import { LocalStrategy } from './strategy/local.strategy';
import { UserEntity } from '../entities/user.entity';

import { SignupModule } from '../signup/signup.module';
import { SignupService } from '../signup/service/signup.service';
import { RequestMiddleware } from '../middlewares/request.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity]),
    SignupModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [LoginController],
  providers: [LoginService, LocalStrategy, SignupService]
})
export class LoginModule { }