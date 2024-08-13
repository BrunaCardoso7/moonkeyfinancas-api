import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
