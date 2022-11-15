import { ApiProperty } from "@nestjs/swagger"

export class OkParamsPattern {
    @ApiProperty()
    token: string
}

export class UnauthorizedParamsPattern {
    @ApiProperty()
    statusCode: number
    @ApiProperty()
    message: string
}