import { Test, TestingModule } from '@nestjs/testing';
import { ProductMovementsController } from './product-movements.controller';
import { ProductMovementsService } from './product-movements.service';

describe('ProductMovementsController', () => {
  let productMovementsController: ProductMovementsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductMovementsController],
      providers: [ProductMovementsService],
    }).compile();

    productMovementsController = app.get<ProductMovementsController>(ProductMovementsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(productMovementsController.getHello()).toBe('Hello World!');
    });
  });
});
