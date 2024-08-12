import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nome: string

    @Column()
    telefone: string

    @Column()
    email: string

    @Column()
    password: string

    @CreateDateColumn() 
    createdAt: Date;

    @CreateDateColumn() 
    updateddAt: Date;
}
