import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../app/entities/user.entity';
import { LoginModule } from '../app/login/login.module';
import { SignupModule } from '../app/signup/signup.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      synchronize: true,
      entities: [UserEntity],
    }),
    SignupModule,
    LoginModule
  ],
  controllers: [],
  providers: [],
})
export class AuthModule { }
