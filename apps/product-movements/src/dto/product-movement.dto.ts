import { Product, ProductMovement } from '@app/database/entities';
import { IsInt, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductMovementDTO {
  @ApiPropertyOptional({
    example: 'AAA111',
    description: 'Product movement id',
  })
  @IsString()
  id: string;

  @ApiPropertyOptional({
    example: 3,
    description: 'Amount of the product in the transaction',
  })
  @IsInt()
  cantidad: number;

  @ApiPropertyOptional({
    example: 'P3333666',
    description: 'Product identifier',
  })
  @IsString()
  idProducto: string;

  @ApiPropertyOptional({
    example: 'ACME Product',
    description: 'Product name',
  })
  @IsString()
  nombreProducto: string;

  static toProductMovement(productMovementDTO: ProductMovementDTO) {
    const productMovement = new ProductMovement();
    productMovement.amount = productMovementDTO.cantidad;
    productMovement.id = productMovementDTO.id;
    productMovement.product = new Product();
    productMovement.product.id = productMovementDTO.idProducto;
    productMovement.product.name = productMovementDTO.nombreProducto;
    return productMovement;
  }

  static fromProductMovement(productMovement: ProductMovement) {
    const productMovementDTO = new ProductMovementDTO();
    productMovementDTO.cantidad = productMovement.amount;
    productMovementDTO.id = productMovement.id;
    productMovementDTO.idProducto = productMovement.productId;
    productMovementDTO.nombreProducto = productMovement.product?.name;
    return productMovementDTO;
  }
}
