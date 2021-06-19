import {
  ProductMovementRepository,
  ProductRepository,
} from '@app/database/repositories';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ProductMovementDTO } from './dto/product-movement.dto';

const MAX_AMOUNT_OF_MONTHLY_PURCHASES = 30;

@Injectable()
export class ProductMovementsService {
  constructor(private connection: Connection) {}

  async savePurchase(
    productMovementDTO: ProductMovementDTO,
  ): Promise<ProductMovementDTO> {
    let purchase: ProductMovementDTO;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const productMovement =
        ProductMovementDTO.toProductMovement(productMovementDTO);
      const productRepository =
        queryRunner.connection.getCustomRepository(ProductRepository);
      const productMovementRepository =
        queryRunner.connection.getCustomRepository(ProductMovementRepository);
      const product = await productRepository.save(productMovement.product);

      await this.validateMonthlyPurchases(
        product.id,
        productMovement.amount,
        productMovementRepository,
      );

      await productMovementRepository.save(productMovement);
      await queryRunner.commitTransaction();

      purchase = ProductMovementDTO.fromProductMovement(productMovement);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
    return purchase;
  }

  async validateMonthlyPurchases(
    productId: string,
    productMovementAmount: number,
    productMovementRepository: ProductMovementRepository,
  ) {
    const monthlyPurchases =
      await productMovementRepository.getMonthlyPurchases(productId);
    if (monthlyPurchases > MAX_AMOUNT_OF_MONTHLY_PURCHASES) {
      throw new ForbiddenException(`You can't add more purchases this month`);
    }
    const amountWithIncomingMovement = monthlyPurchases + productMovementAmount;
    if (amountWithIncomingMovement > MAX_AMOUNT_OF_MONTHLY_PURCHASES) {
      const excess =
        amountWithIncomingMovement - MAX_AMOUNT_OF_MONTHLY_PURCHASES;
      throw new ForbiddenException(
        `You can't add more purchases than ${MAX_AMOUNT_OF_MONTHLY_PURCHASES}. You're exceeding this limit by ${excess}`,
      );
    }
  }
}
