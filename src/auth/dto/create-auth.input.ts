import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateAuthInput {
  @Field(() => String)
  @IsEmail()
  email: string;
  @Field(() => String)
  @IsString()
  password: string;
}
