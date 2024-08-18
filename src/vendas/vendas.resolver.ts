import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VendasService } from './vendas.service';
import { Venda } from './entities/venda.entity';
import { CreateVendaInput } from './dto/create-venda.input';
import { UpdateVendaInput } from './dto/update-venda.input';

@Resolver(() => Venda)
export class VendasResolver {
  constructor(private readonly vendasService: VendasService) {}

  @Mutation(() => Venda, {name: 'createVenda',description: 'cria uma nova venda'})
  createVenda(@Args('createVendaInput') createVendaInput: CreateVendaInput) {
    return this.vendasService.create(createVendaInput);
  }

  @Query(() => [Venda], {name: 'findAllVendas',description: 'lista todas as venda'})
  findAll() {
    return this.vendasService.findAll();
  }

  @Query(() => Venda, {name: 'findVendaById',description: 'lista venda por id'})
  findOne(@Args('id') id: string) {
    return this.vendasService.findOne(id);
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
