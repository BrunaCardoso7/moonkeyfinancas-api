import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploudsService } from './uplouds.service';

@Controller('uplouds')
export class UploudsController {
    constructor(private readonly uploudsService: UploudsService) {}

    @Post('/uplouds')
    @UseInterceptors(FileInterceptor('file'))
    async uploudsFile(@UploadedFile() file: Express.Multer.File) {       
        const fileUrl = await this.uploudsService.uploudsFiles(file)

        return { url: fileUrl }
    }
}
