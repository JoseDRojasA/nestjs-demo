import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Purchase } from './purchase.entity';
import { Sale } from './sale.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  name: string;

  @Column({ nullable: false })
  amount: number;

  @CreateDateColumn({ name: 'created_at', default: () => 'now()' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', default: () => 'now()' })
  updatedAt: Date;

  @OneToMany(() => Purchase, (purchase: Purchase) => purchase.product)
  purchases: Purchase[];

  @OneToMany(() => Sale, (purchase: Sale) => purchase.product)
  sales: Sale[];
}
