import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { SignupService } from './signup.service';
import { InvalidParamsPattern } from './swagger/response-patterns.swagger';

@Controller('/api/v1/signup')
@ApiTags('signup')
export class SignupController {

    constructor(
        private readonly signupService: SignupService
    ) { }

    @Post()
    @ApiOperation({
        summary: 'Fazer o login de um usuário'
    })
    @ApiResponse({
        status: 200,
        description: 'Lista o token do usuário',
        type: UserEntity
    })
    @ApiResponse({
        status: 400,
        description: 'Parametros inválidos',
        type: InvalidParamsPattern
    })
    async signup(@Body() body: SignUpDto) {
        return await this.signupService.signup(body)
    }
}
