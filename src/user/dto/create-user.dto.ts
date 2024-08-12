import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    nome: string
    @IsString()
    @ApiProperty()
    telefone: string
    @IsString()
    @ApiProperty()
    email: string
    @IsString()
    @ApiProperty()
    password: string
}
