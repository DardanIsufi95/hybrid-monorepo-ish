import { Injectable } from '@nestjs/common';

import { sharedFunction, sharedDto } from '@ptera/shared-utils';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(sharedDto);
    return sharedFunction();
  }
}
