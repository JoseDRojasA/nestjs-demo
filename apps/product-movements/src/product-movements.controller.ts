import { Controller, Get } from '@nestjs/common';
import { ProductMovementsService } from './product-movements.service';

@Controller()
export class ProductMovementsController {
  constructor(private readonly productMovementsService: ProductMovementsService) {}

  @Get()
  getHello(): string {
    return this.productMovementsService.getHello();
  }
}
