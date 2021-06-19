import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductMovement {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'product_id', default: 0 })
  productId: string;

  @Column({ nullable: false })
  amount: number;

  @CreateDateColumn({ name: 'created_at', default: () => 'now()' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', default: () => 'now()' })
  updatedAt: Date;

  @ManyToOne(() => Product, (product: Product) => product.movements)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;
}
