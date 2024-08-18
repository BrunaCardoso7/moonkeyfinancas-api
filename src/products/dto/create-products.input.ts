import { InputType, Int, Field, Float } from '@nestjs/graphql';


@InputType()
export class CreateProductInput {
    @Field(() => String)
    produto: string;
    @Field(() => String)
    categoria: string;
    @Field(() => String)
    subCategoria: string;
    @Field(() => Int)
    quantidade: number;
    @Field(() => Float)
    valor: number;
    @Field({nullable: true})
    imagemProfile?: string;
    @Field({nullable: true})
    userId?: string;
}
