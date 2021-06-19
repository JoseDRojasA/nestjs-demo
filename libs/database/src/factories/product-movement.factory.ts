import Faker from 'faker';
import { Product, ProductMovement } from '../entities';
import { define, factory } from 'typeorm-seeding';
import { assign } from 'lodash';

define(ProductMovement, (faker: typeof Faker, properties = {}) => {
  const productMovement = new ProductMovement();
  productMovement.id = faker.lorem.word(10);
  productMovement.amount = Number(faker.finance.amount(1, 10, 0));

  assign(productMovement, properties);

  if (!productMovement.productId) {
    productMovement.product = factory(Product)() as any;
  }
  return productMovement;
});
