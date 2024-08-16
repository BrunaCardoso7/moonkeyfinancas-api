  import { ObjectType, Field, Int } from '@nestjs/graphql';
  import { Product } from 'src/products/entities/product.entity';
  import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

  @ObjectType()
  @Entity({name: 'vendas'})
  export class Venda {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    data_venda: Date;
    
    @Field(() => [Product])
    @ManyToMany(()=>Product, (product) => product.vendas)
    @JoinTable()
    products: Product[]
  }
