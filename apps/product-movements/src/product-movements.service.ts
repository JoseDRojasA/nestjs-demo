import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductMovementsService {
  getHello(): string {
    return 'Hello World!';
  }
}
