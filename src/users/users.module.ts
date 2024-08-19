import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RedisModule } from 'src/config/redis-config.module';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User]),
    RedisModule, 
  ],
  providers: [
    UsersResolver, 
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
