import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-products.input';
import { UpdateProductInput } from './dto/update-product.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Product, {name: 'createProduct',description: 'cria um novo produto'})
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput, @Context() context: any) {
    const userId = context.req.user?.id
    if(userId) {
      createProductInput.userId = userId
    }

    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'findAllproducts', description: 'busca todos por todos os produtos' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'findProductsById', description: "busca produto por id do usuario" })
  findProductById(@Args('userId', { type: () => String }) userId: string) {
    return this.productsService.findProductsById(userId);
  }

  @Mutation(() => Product, {name: 'updateProductById',description: 'update produto por id'})
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productsService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation(() => Product, {name: 'removeProductById',description: 'remove produto por id'})
  removeProduct(@Args('id', { type: () => String }) id: string) {
    return this.productsService.remove(id);
  }
}
