import { EntityRepository, Repository } from 'typeorm';
import { Product } from '@app/database/entities';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
