import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  nome: string
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  telefone: string
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  email: string
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  password: string
}
