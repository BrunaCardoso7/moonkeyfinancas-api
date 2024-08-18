import { Injectable } from '@nestjs/common';
import { CreateVendaInput } from './dto/create-venda.input';
import { UpdateVendaInput } from './dto/update-venda.input';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Venda } from './entities/venda.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class VendasService {
  constructor (
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Venda)
    private readonly vendaRepository: Repository<Venda>
  ) {}

  async create(createVendaInput: CreateVendaInput) {
    createVendaInput.data_venda = new Date

    const {productsIds} = createVendaInput

    let products = []
    
    if (productsIds && productsIds.length > 0) {
        products = await this.productRepository.findBy({
          id: In(productsIds)
        })
    }
      const venda = this.vendaRepository.create({
        ...createVendaInput,
        products
      })
    
    return await this.vendaRepository.save(venda);
  }

  async findAll() {
    return await this.vendaRepository.find();
  }

  async findOne(id: string) {
    return await this.vendaRepository.findOne({
      where: {id}, 
      relations: ['products']
    });
  }

  async update(id: string, updateVendaInput: UpdateVendaInput) {
    updateVendaInput.data_venda = new Date
    const update = await this.vendaRepository.preload({
      id: id,
      ...updateVendaInput
    });
    if (!update) {
      throw new Error('venda não encotrada!')
    }

    return await this.vendaRepository.save(update)
  }
  async remove(id: string) {
    const foundedVenda = await this.vendaRepository.findOne({ where: { id } });

    if (!foundedVenda) {
      throw new Error('Venda não encontrada!');
    }

    const vendaId = foundedVenda.id;
    await this.vendaRepository.remove(foundedVenda);
    return { id: vendaId };
  }
}
