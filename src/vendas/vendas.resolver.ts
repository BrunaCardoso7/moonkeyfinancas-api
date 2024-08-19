import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { VendasService } from './vendas.service';
import { Venda } from './entities/venda.entity';
import { CreateVendaInput } from './dto/create-venda.input';
import { UpdateVendaInput } from './dto/update-venda.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RedisService } from 'src/config/redis-config';

@Resolver(() => Venda)
export class VendasResolver {
  private readonly accessKeyVendasAll = 'vendas-all';
  private readonly accessKeyProductsByVendas = 'product-vendas';
  private readonly accessKeyVendasByUser = 'vendas-user';
  constructor(
    private readonly redisService: RedisService,
    private readonly vendasService: VendasService
  ) {}
  @UseGuards(AuthGuard)
  @Mutation(() => Venda, {name: 'createVenda',description: 'cria uma nova venda'})
  createVenda(@Args('createVendaInput') createVendaInput: CreateVendaInput, @Context() context: any) {
    const userId = context.req.user?.id
    if (!userId) {
      throw new UnauthorizedException("id do usuário não foi fornecida")
    }
    createVendaInput.userId = userId
    return this.vendasService.create(createVendaInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Venda], {name: 'findAllVendas',description: 'lista todas as venda'})
  async findAll() {
    let cachedVendas = await this.redisService.get(this.accessKeyVendasAll)

    if (!cachedVendas) {
      const foundVendas = await this.vendasService.findAll()
      cachedVendas = await this.redisService.set(this.accessKeyVendasAll, JSON.stringify(foundVendas))
    }
    return JSON.parse(cachedVendas)
  }

  @UseGuards(AuthGuard)
  @Query(() => Venda, {name: 'findProductByVendas',description: 'lista venda por id e produtos com realação a venda'})
  async findProductsByVendas(@Args('id') id: string) {
    const cacheKey = `${this.accessKeyProductsByVendas}-${id}`;
    let cachedProductsByVendas = await this.redisService.get(cacheKey)

    if (!cachedProductsByVendas) {
      const foundProductsbyVenda = await this.vendasService.findAll()

      await this.redisService.set(cacheKey, JSON.stringify(foundProductsbyVenda))
      cachedProductsByVendas = JSON.stringify(cachedProductsByVendas);
    }
    return JSON.parse(cachedProductsByVendas)
  }

  @UseGuards(AuthGuard)
  @Query(() => Venda, {name: 'findVendaById',description: 'lista venda por id e com relação com o usuário'})
  async findVendasByUser(@Context() context: any) {
    const userId = context.req.user?.id
    const cacheKey = `${this.accessKeyProductsByVendas}-${userId}`;
    let cachedVendasByUser= await this.redisService.get(cacheKey)

    if (!cachedVendasByUser) {
      const foundVendasByUser = await this.vendasService.findAll()

      await this.redisService.set(cacheKey, JSON.stringify(foundVendasByUser))
      cachedVendasByUser = JSON.stringify(cachedVendasByUser);
    }
    return JSON.parse(cachedVendasByUser)
  }
  @UseGuards(AuthGuard)
  @Mutation(() => Venda,{name: 'updateVendaById',description: 'atualiza venda por id'})
  updateVenda(@Args('updateVendaInput') updateVendaInput: UpdateVendaInput) {
    return this.vendasService.update(updateVendaInput.id, updateVendaInput);
  }
  @UseGuards(AuthGuard)
  @Mutation(() => Venda,{name: 'removeVendaById',description: 'remove venda por id'})
  removeVenda(@Args('id') id: string) {
    return this.vendasService.remove(id);
  }
}
