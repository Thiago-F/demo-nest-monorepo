import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { LoginService } from '../service/login.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly loginService: LoginService
    ) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string) {
        const user = this.loginService.validateUser({ email, password })
        if (!user) throw new UnauthorizedException('Email ou Senha inválida')
        return user;
    }
}