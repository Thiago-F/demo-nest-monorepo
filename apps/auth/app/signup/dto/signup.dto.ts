import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Matches } from 'class-validator'

const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

export class SignUpDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @Matches(PASSWORD_REGEX, { message: 'A senha deve conter letras maiusculas, minusculas, numeros e simbolos' })
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    confirmPassword: string;
}