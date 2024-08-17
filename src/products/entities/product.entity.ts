import { ObjectType, Field } from '@nestjs/graphql';
import { Venda } from 'src/vendas/entities/venda.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({name: 'products'})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field()
  @Column()
  produto: string

  @Field()
  @Column()
  categoria: string

  @Field()
  @Column()
  subCategoria: string

  @Field()
  @Column()
  quantidade: number

  @Field()
  @Column()
  valor: number

  @Field({nullable: true})
  @Column({nullable: true})
  imagemProduct?: string;

  @Field(()=> [Venda])
  @ManyToMany(()=> Venda, (venda) => venda.products)
  vendas: Venda[]
}
