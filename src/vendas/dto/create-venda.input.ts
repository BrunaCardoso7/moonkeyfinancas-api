import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVendaInput {
  @Field(() => String, { nullable: true })
  id?: string;
  @Field({nullable:true})
  data_venda?: Date;

  @Field(() => [String], { nullable: true })
  productsIds?: string[];
} 
