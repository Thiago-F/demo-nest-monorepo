import { ApiProperty } from "@nestjs/swagger"

export class InvalidParamsPattern {
    @ApiProperty()
    status: number

    @ApiProperty()
    message: string[]

    @ApiProperty()
    error: string
}

export class UnauthorizedParamsPattern {
    @ApiProperty()
    statusCode: number

    @ApiProperty()
    message: string[]

    @ApiProperty()
    error: string
}
