import Faker from 'faker';
import { Product } from '@app/database/entities';
import { define } from 'typeorm-seeding';
import { assign } from 'lodash';

define(Product, (faker: typeof Faker, properties: Partial<Product> = {}) => {
  const product = new Product();
  product.id = faker.lorem.word(10);
  product.name = faker.commerce.productName();

  assign(product, properties);

  return product;
});
