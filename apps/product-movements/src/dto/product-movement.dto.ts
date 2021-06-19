import { Product, ProductMovement } from '@app/database/entities';

export class ProductMovementDTO {
  id: string;
  fecha: Date;
  cantidad: number;
  idProducto: string;
  nombreProducto: string;

  toProductMovement() {
    const productMovement = new ProductMovement();
    productMovement.amount = this.cantidad;
    productMovement.createdAt = this.fecha;
    productMovement.id = this.id;
    productMovement.product = new Product();
    productMovement.product.id = this.idProducto;
    productMovement.product.name = this.nombreProducto;
    return productMovement;
  }

  static fromProductMovement(productMovement: ProductMovement) {
    const productMovementDTO = new ProductMovementDTO();
    productMovementDTO.cantidad = productMovement.amount;
    productMovementDTO.fecha = productMovement.createdAt;
    productMovementDTO.id = productMovement.id;
    productMovementDTO.idProducto = productMovement.productId;
    productMovementDTO.nombreProducto = productMovement.product?.name;
    return productMovementDTO;
  }
}
