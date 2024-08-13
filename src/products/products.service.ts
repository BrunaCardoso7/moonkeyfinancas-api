import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-products.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor (
    @InjectRepository(Product)
    private produtoRepository: Repository<Product>
  ) {}
  async create(createProductInput: CreateProductInput) {
    return await this.produtoRepository.save(createProductInput);
  }

  async findAll() {
    return await this.produtoRepository.find();
  }

  async findOne(id: string) {
    return await this.produtoRepository.findOne({where: { id }});
  }

  async update(id: string, updateProductInput: UpdateProductInput) {
    const product = await this.produtoRepository.preload({
      id,
      ...updateProductInput,
    });

    if (!product) {
      throw new Error('product not found');
    }

    return this.produtoRepository.save(product);;
  }

  async remove(id: string) {
    return await this.produtoRepository.delete(id);
  }
}
