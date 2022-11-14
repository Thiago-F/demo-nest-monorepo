import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class SignupService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ) { }

    async findUserByEmail(email: string) {
        return await this.usersRepository.findOneOrFail({ where: { email } })
    }

    async signup(data: SignUpDto) {
        const { password, confirmPassword, ...rest } = data

        if (password !== confirmPassword) {
            throw new UnauthorizedException('Password does not match with confirmPassword')
        }

        const user = this.usersRepository.create({ ...rest, client_secret: password })
        return this.usersRepository.save(user)
    }
}
