import { Repository } from 'typeorm';
import { Sale } from '@app/database/entities';

export class SaleRepository extends Repository<Sale> {}
