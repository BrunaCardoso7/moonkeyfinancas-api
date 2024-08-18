import { Module } from '@nestjs/common';
import { UploadsService } from './uplouds.service';
import { UploudsController } from './uplouds.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  providers: [
    UploadsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  controllers: [UploudsController],
})
export class UploudsModule {}
