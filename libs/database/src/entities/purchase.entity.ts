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
export class Purchase {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ name: 'product_id', default: 0 })
  productId: string;

  @Column({ default: 0 })
  amount: number;

  @CreateDateColumn({ name: 'created_at', default: () => 'now()' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', default: () => 'now()' })
  updatedAt: Date;

  @ManyToOne(() => Product, (product: Product) => product.purchases)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;
}
