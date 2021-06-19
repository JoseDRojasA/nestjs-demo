import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ProductMovementsModule } from '../src/product-movements.module';
import { ProductMovementDTO } from '../src/dto/product-movement.dto';

import * as request from 'supertest';
import * as Faker from 'faker';
import { KnexCleanerService } from '@app/common/testing/knex-cleaner.service';

describe('ProductMovementsController (e2e)', () => {
  let app: INestApplication;
  let knexCleanerService: KnexCleanerService;
  let response;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductMovementsModule],
      providers: [KnexCleanerService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    knexCleanerService = app.get<KnexCleanerService>(KnexCleanerService);
  });

  describe('(POST) /registrar-compra', () => {
    const sendRequest = (payload: Partial<ProductMovementDTO>) =>
      request(app.getHttpServer()).post('/registrar-compra').send(payload);

    describe('when the product is not defined', () => {
      let payload: Partial<ProductMovementDTO>;
      beforeEach(async () => {
        payload = {
          id: Faker.lorem.word(10),
          cantidad: Number(Faker.finance.amount(1, 10, 0)),
          idProducto: Faker.lorem.word(10),
          nombreProducto: Faker.commerce.productName(),
        };
        response = await sendRequest(payload);
      });

      it('should return 201', () => {
        expect(response.statusCode).toBe(201);
      });
    });
  });

  afterEach(async () => {
    await knexCleanerService.cleanDB();
  });

  afterAll(async () => {
    await app.close();
  });
});
