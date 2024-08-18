import { BadRequestException, Injectable } from '@nestjs/common';
import * as path from 'path';
import { pipeline } from 'stream/promises';
import { createWriteStream, promises as fsPromises } from 'fs';
import { Readable } from 'stream';

@Injectable()
export class UploadsService {
  async uploadFiles(file: Express.Multer.File) {
    if (!file || !file.buffer) {
      throw new BadRequestException('Arquivo não fornecido ou inválido.');
    }

    const uploadDir = path.join(process.cwd(), 'src/uploadFile');
    const filePath = path.join(uploadDir, file.originalname);
    console.log(uploadDir)
    try {
      await fsPromises.mkdir(uploadDir, { recursive: true });

      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null); 

      await pipeline(
        readableStream,
        createWriteStream(filePath),
      );

      return `/uploadFile/${file.originalname}`;
    } catch (error) {
      throw new Error(`Falha ao realizar o upload do arquivo: \n ${error.message}`);
    }
  }
}
