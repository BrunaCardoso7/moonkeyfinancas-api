import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, {name: 'createUser',description: 'cria um novo usuário'})
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [User], { name: 'findAllUsers', description: "lista todos os usuários"})
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'findProductsByUsers', description: "lista produtos pelo id do usuário" })
  findProductsByUsers(@Context() context: any) {
    const userId = context.req.user?.id
    if (!userId) {
      throw new UnauthorizedException("id do usuário não foi fornecida")
    }
    return this.usersService.findProductsByUsers(userId);
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'findVendasByUsers', description: "lista vendas pelo id do usuário" })
  findVendasByUsers(@Context() context: any) {
    const userId = context.req.user?.id
    if(!userId) {
      throw new UnauthorizedException("id do usuário não foi fornecida")
    }
    return this.usersService.findVendasByUsers(userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User, { name: 'updateUserById', description: "atualiza usuário pelo id" })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput, @Context() context: any) {
    const userId = context.req.user?.id
    console.log(userId)
    if(!userId) {
      throw new UnauthorizedException("id do usuário não foi fornecida")
    }
    return this.usersService.update(userId, updateUserInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User,{ name: 'deleteUserById', description: "remove usuário pelo id" })
  removeUser(@Context() context: any) {
    const userId = context.req.user?.id 
    if(!userId) {
      throw new UnauthorizedException("id do usuário não foi fornecida")
    }
    return this.usersService.remove(userId);
  }
}
