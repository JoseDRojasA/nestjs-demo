import { Repository } from 'typeorm';
import { ProductMovement } from '../entities/product-movement.entity';

export class ProductMovementRepository extends Repository<ProductMovement> {}
