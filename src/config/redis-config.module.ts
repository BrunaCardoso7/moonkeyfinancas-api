import { Module } from '@nestjs/common';
import { RedisService } from './redis-config';

@Module({
  providers: [RedisService],
  exports: [RedisService,RedisModule],
})
export class RedisModule {}
