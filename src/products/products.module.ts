import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductsResolver, 
    ProductsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ProductsModule {}
