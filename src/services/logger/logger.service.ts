import { ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';

export class LoggerService extends ConsoleLogger {
  error(message: any, stackOrContext?: string) {
    fs.appendFile(
      'error.log',
      `${this.getTimestamp()} | ERROR |  [${stackOrContext}]\n\n`,
      (err) => {},
    );
    super.error(message, stackOrContext);
  }
}
