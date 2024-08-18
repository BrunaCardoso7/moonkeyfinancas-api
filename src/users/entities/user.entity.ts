import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { Venda } from 'src/vendas/entities/venda.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@ObjectType()
@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  nome: string;

  @Field()
  @Column()
  telefone: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  
  @Field({nullable: true})
  @Column({nullable: true})
  imagemProfile?: string;

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.user)
  products?: Product[];


  @Field(() => [Venda], { nullable: true })
  @OneToMany(() => Venda, (venda) => venda.user)
  vendas?: Venda[]
}
