import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { VendasModule } from './vendas/vendas.module';
import { Venda } from './vendas/entities/venda.entity';
import { UploudsModule } from './uplouds/uplouds.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      introspection: true,  
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), '/src/uploadFile'), // Ajuste conforme necessário
      serveRoot: '/uploadFile',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:FgmBkNNuCkykHXFleyialUYrWyJogvXp@junction.proxy.rlwy.net:19983/railway',
      entities: [User, Product, Venda],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    AuthModule, 
    VendasModule, 
    UploudsModule,
  ],

})
export class AppModule {}
