import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RedisService } from 'src/config/redis-config';

@Resolver(() => User)
export class UsersResolver {
  private readonly accessKeyProduct = 'user-product';
  private readonly accessKeyVendas = 'user-vendas';
  constructor(
    private readonly usersService: UsersService,
    private readonly redisService: RedisService
  ) {}  

  @Mutation(() => User, {name: 'createUser',description: 'cria um novo usuário'})
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  // @UseGuards(AuthGuard)
  @Query(() => [User], { name: 'findAllUsers', description: "lista todos os usuários"})
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'findProductsByUsers', description: "lista produtos pelo id do usuário" })
  async findProductsByUsers(@Context() context: any) {
    const userId = context.req.user?.id;
    if (!userId) {
      throw new UnauthorizedException("id do usuário não foi fornecida");
    }
    const cacheKey = `${this.accessKeyProduct}-${userId}`;
    let cachedProductByUser = await this.redisService.get(cacheKey);
    if (!cachedProductByUser) {
      const productsByUsers = await this.usersService.findProductsByUsers(userId);
      if (!productsByUsers || !productsByUsers.id) {
        throw new Error("Usuário não encontrado ou sem ID.");
      }
      await this.redisService.set(cacheKey, JSON.stringify(productsByUsers));
      cachedProductByUser = JSON.stringify(cachedProductByUser);
    }
    return JSON.parse(cachedProductByUser);
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'findVendasByUsers', description: "lista vendas pelo id do usuário" })
  async findVendasByUsers(@Context() context: any) {
    const userId = context.req.user?.id

    if(!userId) {
      throw new UnauthorizedException("id do usuário não foi fornecida")
    }

    const cacheKey = `${this.accessKeyVendas}-${userId}`;
    let cachedVendasbyUser = await this.redisService.get(cacheKey);

    if (!cachedVendasbyUser) {
      const vendasByUsers = await this.usersService.findProductsByUsers(userId);
      if (!vendasByUsers || !vendasByUsers.id) {
        throw new Error("Usuário não encontrado ou sem ID.");
      }
      await this.redisService.set(cacheKey, JSON.stringify(vendasByUsers));
      cachedVendasbyUser = JSON.stringify(cachedVendasbyUser);
    }

    return JSON.parse(cachedVendasbyUser)
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
