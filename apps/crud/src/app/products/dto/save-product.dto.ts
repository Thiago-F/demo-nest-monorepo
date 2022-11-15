import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class SaveProductDto {

    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @ApiProperty()
    value: number

    @IsNotEmpty()
    @ApiProperty()
    category: string
}