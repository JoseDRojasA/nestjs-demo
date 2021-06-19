import { Product, ProductMovement } from '@app/database/entities';

export class ProductMovementDTO {
  id: string;
  cantidad: number;
  idProducto: string;
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
