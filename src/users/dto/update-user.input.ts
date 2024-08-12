import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  id?: string;
  @Field(() => String)
  @IsString()
  nome?: string
  @Field(() => String)
  @IsString()
  telefone?: string
  @Field(() => String)
  @IsString()
  email?: string
  @Field(() => String)
  @IsString()
  password?: string
}
