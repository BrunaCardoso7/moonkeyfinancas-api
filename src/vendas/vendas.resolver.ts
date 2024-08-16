import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VendasService } from './vendas.service';
import { Venda } from './entities/venda.entity';
import { CreateVendaInput } from './dto/create-venda.input';
import { UpdateVendaInput } from './dto/update-venda.input';

@Resolver(() => Venda)
export class VendasResolver {
  constructor(private readonly vendasService: VendasService) {}

  @Mutation(() => Venda)
  createVenda(@Args('createVendaInput') createVendaInput: CreateVendaInput) {
    return this.vendasService.create(createVendaInput);
  }

  @Query(() => [Venda], { name: 'findAll' })
  findAll() {
    return this.vendasService.findAll();
  }

  @Query(() => Venda, { name: 'findOne' })
  findOne(@Args('id') id: string) {
    return this.vendasService.findOne(id);
  }

  @Mutation(() => Venda)
  updateVenda(@Args('updateVendaInput') updateVendaInput: UpdateVendaInput) {
    return this.vendasService.update(updateVendaInput.id, updateVendaInput);
  }

  @Mutation(() => Venda)
  removeVenda(@Args('id') id: string) {
    return this.vendasService.remove(id);
  }
}
