import Faker from 'faker';
import { Product } from '../entities';
import { define } from 'typeorm-seeding';
import { assign } from 'lodash';

define(Product, (faker: typeof Faker, properties = {}) => {
  const product = new Product();
  product.name = faker.commerce.product();

  assign(product, properties);
  return product;
});
