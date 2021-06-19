import { Repository } from 'typeorm';
import { Purchase } from '@app/database/entities';

export class PurchaseRepository extends Repository<Purchase> {}
