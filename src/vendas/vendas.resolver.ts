import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { VendasService } from './vendas.service';
import { Venda } from './entities/venda.entity';
import { CreateVendaInput } from './dto/create-venda.input';
import { UpdateVendaInput } from './dto/update-venda.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Venda)
export class VendasResolver {
  constructor(private readonly vendasService: VendasService) {}
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

  @Query(() => [Venda], {name: 'findAllVendas',description: 'lista todas as venda'})
  findAll() {
    return this.vendasService.findAll();
  }

  
  @Query(() => Venda, {name: 'findProductByVendas',description: 'lista venda por id e produtos com realação a venda'})
  findProductsByVendas(@Args('id') id: string) {
    return this.vendasService.findProductsByVendas(id);
  }

  @Query(() => Venda, {name: 'findVendaById',description: 'lista venda por id e com relação com o usuário'})
  findVendasByUser(@Args('id') id: string) {
    return this.vendasService.findVendasByUser(id);
  }

  @Mutation(() => Venda,{name: 'updateVendaById',description: 'atualiza venda por id'})
  updateVenda(@Args('updateVendaInput') updateVendaInput: UpdateVendaInput) {
    return this.vendasService.update(updateVendaInput.id, updateVendaInput);
  }

  @Mutation(() => Venda,{name: 'removeVendaById',description: 'remove venda por id'})
  removeVenda(@Args('id') id: string) {
    return this.vendasService.remove(id);
  }
}
