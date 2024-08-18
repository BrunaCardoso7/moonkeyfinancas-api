import { Module } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { VendasResolver } from './vendas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/entities/product.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venda]),  
    TypeOrmModule.forFeature([Product]),
    ProductsModule
  ],
  providers: [
    VendasResolver, 
    VendasService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class VendasModule {}
