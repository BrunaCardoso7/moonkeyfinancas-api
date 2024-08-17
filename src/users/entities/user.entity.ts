import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';


@ObjectType()
@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
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

  // @Field()
  // @CreateDateColumn()
  // updateddAt: Date;
}
