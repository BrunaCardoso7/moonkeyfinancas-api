import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-products.input';
import { UpdateProductInput } from './dto/update-product.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RedisService } from 'src/config/redis-config';

@Resolver(() => Product)
export class ProductsResolver {
  private readonly accessKeyProductAll = 'product-all';
  private readonly accessKeyProductsByUser = 'user-product';
  constructor(
    private readonly redisService: RedisService,
    private readonly productsService: ProductsService
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Product, {name: 'createProduct',description: 'cria um novo produto'})
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput, @Context() context: any) {
    const userId = context.req.user?.id
    if(userId) {
      createProductInput.userId = userId
    }

    return this.productsService.create(createProductInput);
  }
  @UseGuards(AuthGuard)
  @Query(() => [Product], { name: 'findAllproducts', description: 'busca todos por todos os produtos' })
  async findAll() {
    let cachedProducts = await this.redisService.get(this.accessKeyProductAll)
    if(!cachedProducts) {
      const findAllProducts = await  this.productsService.findAll()

      await this.redisService.set(this.accessKeyProductAll, JSON.stringify(findAllProducts))
      cachedProducts = JSON.stringify(cachedProducts  );
    }
    return JSON.parse(cachedProducts)
  }
  @UseGuards(AuthGuard)
  @Query(() => Product, { name: 'findProductsById', description: "busca produto por id do usuario" })
  async findProductByUser(@Args('userId', { type: () => String }) userId: string) {
    const cacheKey = `${this.accessKeyProductsByUser}-${userId}`;
    let cachedProductsbyUser = await this.redisService.get(cacheKey)
    if (!cachedProductsbyUser) {
      const foundProductsByUser = await this.productsService.findProductsById(userId)

      await this.redisService.set(cacheKey, JSON.stringify(foundProductsByUser))
      cachedProductsbyUser = JSON.stringify(cachedProductsbyUser);
    }
    return JSON.parse(cachedProductsbyUser)
  }
  @UseGuards(AuthGuard)
  @Mutation(() => Product, {name: 'updateProductById',description: 'update produto por id'})
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productsService.update(updateProductInput.id, updateProductInput);
  }
  @UseGuards(AuthGuard)
  @Mutation(() => Product, {name: 'removeProductById',description: 'remove produto por id'})
  removeProduct(@Args('id', { type: () => String }) id: string) {
    return this.productsService.remove(id);
  }
}
