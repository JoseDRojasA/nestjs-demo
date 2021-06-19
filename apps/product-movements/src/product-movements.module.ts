import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ProductMovementsController } from './product-movements.controller';
import { ProductMovementsService } from './product-movements.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductMovementsController],
  providers: [ProductMovementsService],
})
export class ProductMovementsModule {}
