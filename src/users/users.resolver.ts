import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Mutation(() => User, { description: 'Cria um novo usuário' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
  @Query(() => [User], { name: 'findAll', description: 'Retorna todos os usuários' })
  @UseGuards(AuthGuard)  
  findAll() {
    return this.usersService.findAll();
  }
  @Query(() => User, { name: 'findOne', description: 'Retorna um usuário pelo ID' },)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }
  @Mutation(() => User, { description: 'Atualiza um usuário existente' })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
