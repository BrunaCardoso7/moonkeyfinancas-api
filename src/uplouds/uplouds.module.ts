import { Module } from '@nestjs/common';
import { UploudsService } from './uplouds.service';
import { UploudsController } from './uplouds.controller';

@Module({
  providers: [UploudsService],
  controllers: [UploudsController],
})
export class UploudsModule {}
