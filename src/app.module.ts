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
import { AuthResolver } from './auth/auth.resolver';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      introspection: true,  
      context: ({ req }) => ({ req }), 
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), '/src/uploadFile'), 
      serveRoot: '/uploadFile',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:PqCKNfnFinhPvhLZskGndxUyYCmDzFet@junction.proxy.rlwy.net:43244/railway',
      entities: [User, Product, Venda],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    AuthModule,   
    VendasModule, 
    UploudsModule,
  ],
  providers: [AuthResolver, AuthService],
})
export class AppModule {}
