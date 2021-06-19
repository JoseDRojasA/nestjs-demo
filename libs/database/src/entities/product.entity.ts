import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductMovement } from './product-movement.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

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
