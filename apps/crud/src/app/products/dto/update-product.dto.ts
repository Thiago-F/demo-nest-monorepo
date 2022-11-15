import { ApiProperty } from "@nestjs/swagger"

export class UpdateProductDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    value: number

    @ApiProperty()
    category: string
}