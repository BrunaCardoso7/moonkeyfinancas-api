import { CreateProductInput } from "./create-products.input";
import { InputType, Field, PartialType, Int, Float } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => String, { nullable: true })
  id?: string;  
  @Field(() => String, { nullable: true })
  produto?: string;
  @Field(() => String, { nullable: true })
  categoria?: string;
  @Field(() => String, { nullable: true })
  subCategoria?: string;
  @Field(() => Int, { nullable: true })
  quantidade?: number;
  @Field(() => Float, { nullable: true })
  valor?: number;
  @Field({nullable: true})
  imagemProfile?: string;
  @Field({nullable: true})
  userId?: string;
}