import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('/api/v1/login')
export class LoginController {

    constructor(
        private readonly loginService: LoginService
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post()
    async login(@Body() body: LoginDto, @Req() request) {
        return await this.loginService.login(request.user)
    }
}
