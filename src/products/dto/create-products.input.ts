import { InputType, Int, Field } from '@nestjs/graphql';


@InputType()
export class CreateProductInput {
    @Field(() => String)
    produto: string;
    @Field(() => String)
    categoria: string;
    @Field(() => String)
    subCategoria: string;
    @Field(() => String)
    quantidade: number;
    @Field(() => String)
    valor: number;
}
