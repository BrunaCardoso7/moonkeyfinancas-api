  import { ObjectType, Field, Int } from '@nestjs/graphql';
  import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
  import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
    
    // @Field({nullable: true})
    // @Column({nullable: true})
    // @ManyToOne(() => User, (user) => user.vendas)
    // users: User
  }
