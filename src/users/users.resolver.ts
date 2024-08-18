import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, {name: 'createUser',description: 'cria um novo usuário'})
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  // @UseGuards(AuthGuard)
  @Query(() => [User], { name: 'findAllUsers', description: "lista todos os usuários"})
  findAll() {
    return this.usersService.findAll();
  }

  // @UseGuards(AuthGuard)
  @Query(() => User, { name: 'findUserById', description: "lista usuário pelo id" })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User, { name: 'updateUserById', description: "atualiza usuário pelo id" })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  // @UseGuards(AuthGuard)
  @Mutation(() => User,{ name: 'deleteUserById', description: "remove usuário pelo id" })
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
