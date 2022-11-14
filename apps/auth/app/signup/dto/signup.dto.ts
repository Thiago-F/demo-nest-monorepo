import { IsNotEmpty, ValidateIf, IsEmail, Matches } from 'class-validator'

const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

export class SignUpDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(PASSWORD_REGEX)
    password: string;

    @IsNotEmpty()
    confirmPassword: string;
}