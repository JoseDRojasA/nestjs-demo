import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ProductMovement } from './product-movement.entity';

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;

  @Column({ default: 0 })
  name: string;

  @CreateDateColumn({ name: 'created_at', default: () => 'now()' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', default: () => 'now()' })
  updatedAt: Date;

  @OneToMany(
    () => ProductMovement,
    (movement: ProductMovement) => movement.product,
  )
  movements: ProductMovement[];
}
