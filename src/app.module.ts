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

@Module({
  imports: [
    ProductsModule,
    AuthModule, 
    UsersModule, 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      introspection: true, 
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:uVIKyuyQKWcdsWwbOlBKzKMPqqqoKCXY@roundhouse.proxy.rlwy.net:19019/railway',
      entities: [User, Product],
      synchronize: true,
    }),

  ],

})
export class AppModule {}
