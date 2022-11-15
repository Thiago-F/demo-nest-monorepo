import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginService } from '../service/login.service';
import { LoginDto } from '../dto/login.dto';
import { UnauthorizedParamsPattern, OkParamsPattern } from '../swagger/response-patterns.swagger'


@Controller('/api/v1/login')
@ApiTags('login')
export class LoginController {

    constructor(
        private readonly loginService: LoginService
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post()
    @ApiOperation({
        summary: 'Fazer o login de um usuário'
    })
    @ApiResponse({
        status: 200,
        description: 'Lista o token do usuário',
        type: OkParamsPattern
    })
    @ApiResponse({
        status: 401,
        description: 'Não autorizado',
        type: UnauthorizedParamsPattern
    })
    async login(@Body() body: LoginDto, @Req() request) {
        return await this.loginService.login(request.user)
    }
}
