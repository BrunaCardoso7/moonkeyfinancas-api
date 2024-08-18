  import { CreateVendaInput } from './create-venda.input';
  import { InputType, Field, PartialType } from '@nestjs/graphql';

  @InputType()
  export class UpdateVendaInput extends PartialType(CreateVendaInput) {
    @Field(() => String, { nullable: true })
    id?: string;
    @Field({nullable: true})
    data_venda?: Date;

    @Field(() => [String], { nullable: true })
    productsIds?: string[];

    @Field(() => [String], { nullable: true })
    userId?: string;
  }
