import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    nome: string
    @ApiProperty()
    telefone: string
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
}
