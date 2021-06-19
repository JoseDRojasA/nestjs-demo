import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductMovementDTO } from './dto/product-movement.dto';
import { ProductMovementsService } from './product-movements.service';

@Controller()
export class ProductMovementsController {
  constructor(private readonly service: ProductMovementsService) {}

  @Get()
  healthCheck(): string {
    return;
  }

  @Post('/registrar-compra')
  savePurchase(@Body() body: ProductMovementDTO) {
    return this.service.savePurchase(body);
  }
}
