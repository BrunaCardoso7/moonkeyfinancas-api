import { Module } from '@nestjs/common';
import { UploadsService } from './uplouds.service';
import { UploudsController } from './uplouds.controller';

@Module({
  providers: [UploadsService],
  controllers: [UploudsController],
})
export class UploudsModule {}
