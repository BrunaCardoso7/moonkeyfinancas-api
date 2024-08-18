import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  nome: string
  @Field(() => String)
  @IsNotEmpty()
  telefone: string
  @Field(() => String)
  @IsNotEmpty()
  email: string
  @Field(() => String)
  @IsNotEmpty()
  password: string
  
  @Field({nullable: true})
  imagemProfile?: string;

}
