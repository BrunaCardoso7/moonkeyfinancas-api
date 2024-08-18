import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-products.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  constructor (
    @InjectRepository(User)
    private userService: UsersService,
    @InjectRepository(Product)
    private produtoRepository: Repository<Product>
  ) {}
  async create(createProductInput: CreateProductInput) {

    const produto = this.produtoRepository.create({
      ...createProductInput,
    });
  
    return await this.produtoRepository.save(produto);
  }

  async findAll() {
    return await this.produtoRepository.find();
  }

  async findProductsById(userId: string) {
    return await this.produtoRepository.find({
      where: { userId },
      relations: ['users'],
    });
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
