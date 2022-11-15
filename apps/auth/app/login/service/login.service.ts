import { compareSync } from 'bcrypt'
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../../entities/user.entity';
import { SignupService } from '../../signup/signup.service';

@Injectable()
export class LoginService {
    constructor(
        private readonly signUpService: SignupService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser({ email, password }) {
        let user: UserEntity
        try {
            user = await this.signUpService.findUserByEmail(email)
        } catch (error) {
            return null
        }

        const isValid = compareSync(password, user.client_secret)
        if (!isValid) return null

        return user
    }

    async login(user: UserEntity) {
        const payload = { client_id: user.client_id, email: user.email }

        return {
            token: this.jwtService.sign(payload)
        }
    }
}
