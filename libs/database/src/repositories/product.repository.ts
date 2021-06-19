import { Repository } from 'typeorm';
import { Product } from '@app/database/entities';

export class ProductRepository extends Repository<Product> {}
