import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductMovementDTO } from './dto/product-movement.dto';
import { ProductMovementsService } from './product-movements.service';

@ApiTags('product-movements')
@Controller()
export class ProductMovementsController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly service: ProductMovementsService) {}

  @Get()
  @ApiOperation({
    summary: 'Check if the service is still available',
  })
  @ApiResponse({ status: 200 })
  healthCheck(): void {
    return;
  }

  @Post('/registrar-compra')
  @ApiOperation({
    summary:
      'Create a purchase. If the product does not exist, It is created automatically',
  })
  @ApiResponse({ status: 201, description: 'Purchase' })
  savePurchase(@Body() body: ProductMovementDTO): Promise<ProductMovementDTO> {
    return this.service.savePurchase(body);
  }

  @Post('/registrar-venta')
  @ApiOperation({
    summary:
      'Create a sell. If the product does not exist, It is created automatically',
  })
  @ApiResponse({ status: 201, description: 'Sell' })
  saveSell(@Body() body: ProductMovementDTO): Promise<ProductMovementDTO> {
    return this.service.saveSell(body);
  }
}
