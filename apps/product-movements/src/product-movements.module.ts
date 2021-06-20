import { DatabaseModule } from '@app/database';
import {
  ProductMovementRepository,
  ProductRepository,
} from '@app/database/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMovementsController } from './product-movements.controller';
import { ProductMovementsService } from './product-movements.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([ProductRepository, ProductMovementRepository]),
  ],
  controllers: [ProductMovementsController],
  providers: [ProductMovementsService],
})
export class ProductMovementsModule {}
