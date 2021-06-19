import { DatabaseModule } from '@app/database';
import { Product, ProductMovement } from '@app/database/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMovementsController } from './product-movements.controller';
import { ProductMovementsService } from './product-movements.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Product, ProductMovement]),
  ],
  controllers: [ProductMovementsController],
  providers: [ProductMovementsService],
})
export class ProductMovementsModule {}
