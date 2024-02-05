import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { join, resolve } from 'path';
import * as fs from 'fs';

@Injectable()
export class FsService {
  private readonly staticPath: string = resolve('static');

  async saveFile(path: string, fileName: string, file: Buffer) {
    try {
      const parsedPath = path.split('/');

      const newPath = join(this.staticPath, ...parsedPath);

      const isDirExists = fs.existsSync(newPath);

      if (!isDirExists) {
        fs.mkdirSync(newPath, { recursive: true });
      }

      fs.writeFileSync(join(newPath, fileName), file);
    } catch (e) {
      throw new InternalServerErrorException({
        type: 'saveFile',
        description: "Can't create file",
        error: e,
      });
    }
  }

  async deleteFile(path: string, fileName: string) {
    try {
      const parsedPath = path.split('/');

      const newPath = join(this.staticPath, ...parsedPath);

      const isFileExists = fs.existsSync(join(newPath, fileName));

      if (isFileExists) {
        fs.rmSync(join(newPath, fileName));
      }
    } catch (e) {
      throw new InternalServerErrorException({
        type: 'deleteFile',
        description: "Can't delete file",
        error: e,
      });
    }
  }
}
