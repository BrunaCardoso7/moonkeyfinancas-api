import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateAuthInput {
  @Field(() => String)
  @IsEmail()
  email: string;
  @Field(() => String)
  password: string;
}
