import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SignupService } from './signup.service';

@Controller('/api/v1/signup')
export class SignupController {

    constructor(
        private readonly signupService: SignupService
    ) { }

    @Post()
    async signup(@Body() body: SignUpDto) {
        return await this.signupService.signup(body)
    }
}
