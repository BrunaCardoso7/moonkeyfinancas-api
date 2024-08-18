import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


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
}
