import { Injectable } from '@nestjs/common';

import path from 'path';
import { pipeline } from 'stream/promises';
import { createWriteStream, promises as fsPromises } from 'fs';

@Injectable()
export class UploudsService {
  async uploudsFiles(file: Express.Multer.File){
    const filePath = path.join(__dirname, `../uploudFile/${file.filename}`)
    try {
      await pipeline(
        file.stream,
        createWriteStream(filePath),
      );

      return `/uploudFile/${file.originalname}`
    } catch (error) {
      throw new Error(`falha para realizar o uploud do arquivo: \n ${error}`)
    }
  }
}
