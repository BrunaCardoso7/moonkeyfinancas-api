import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uplouds.service';

@Controller('/uplouds')
export class UploudsController {
    constructor(private readonly uploadsService: UploadsService) {}

    @Post('/')
    @UseInterceptors(FileInterceptor('file'))
    async uploudsFile(@UploadedFile() file: Express.Multer.File) {       
        const fileUrl = await this.uploadsService.uploadFiles(file)

        return { url: fileUrl }
    }
}
