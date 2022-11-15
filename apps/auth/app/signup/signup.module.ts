import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { SignupController } from './controller/signup.controller';
import { SignupService } from './service/signup.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [SignupController],
  providers: [SignupService]
})
export class SignupModule { }
