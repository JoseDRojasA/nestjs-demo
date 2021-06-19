import * as moment from 'moment';
import { EntityRepository, Repository } from 'typeorm';
import { ProductMovement } from '../entities/product-movement.entity';

@EntityRepository(ProductMovement)
export class ProductMovementRepository extends Repository<ProductMovement> {
  async getInventory(productId: string): Promise<number> {
    const { sum } = await this.createQueryBuilder('productMovement')
      .select('SUM(productMovement.amount)', 'sum')
      .where('productMovement.productId = :productId', { productId })
      .groupBy('user.id')
      .getRawOne();
    return sum;
  }

  async getMonthlyPurchases(productId: string): Promise<number> {
    const firstDayOfTheMonth = moment().startOf('month').toDate();
    const lastDayOfTheMonth = moment().endOf('month').toDate();
    const sum = await this.createQueryBuilder('productMovement')
      .select('SUM(productMovement.amount)', 'sum')
      .where('productMovement.productId = :productId', { productId })
      .andWhere('productMovement.amount > 0')
      .andWhere('productMovement.createdAt >= :firstDayOfTheMonth', {
        firstDayOfTheMonth,
      })
      .andWhere('productMovement.createdAt <= :lastDayOfTheMonth', {
        lastDayOfTheMonth,
      })
      .groupBy('productMovement.productId')
      .getRawOne();
    return sum;
  }
}
