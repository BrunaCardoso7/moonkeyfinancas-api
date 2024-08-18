import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'vendas' })
export class Venda {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  data_venda: Date;

  @Column()
  @Field()
  userId: string;

  @Field(() => [Product], { nullable: true })
  @ManyToMany(() => Product, (product) => product.vendas)
  @JoinTable({
    name: 'venda_products',
    joinColumn: { name: 'vendaId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  })
  products?: Product[];

  @ManyToOne(() => User, (user) => user.vendas)
  @JoinColumn({ name: 'userId' })
  @Field(() => User, { nullable: true })
  user?: User;
}
