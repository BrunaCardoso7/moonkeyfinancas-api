import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Venda } from 'src/vendas/entities/venda.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  produto: string;

  @Field()
  @Column()
  categoria: string;

  @Field()
  @Column()
  subCategoria: string;

  @Field()
  @Column()
  quantidade: number;

  @Field()
  @Column()
  valor: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imagemProduct?: string;

  @Column()
  @Field()
  userId: string;

  @Field(() => [Venda], {nullable: true})
  @ManyToMany(() => Venda, (venda) => venda.products)
  vendas?: Venda[];

  @ManyToOne(() => User, (user) => user.products)
  @Field(() => User, {nullable: true})
  @JoinColumn({ name: 'userId' })
  user?: User;
}
