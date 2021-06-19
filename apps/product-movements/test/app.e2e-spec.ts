import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductMovementsModule } from './../src/product-movements.module';
import { ProductMovementDTO } from '../src/dto/product-movement.dto';
import Faker from 'faker';

describe('ProductMovementsController (e2e)', () => {
  let app: INestApplication;
  let response;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductMovementsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('(POST) /registrar-compra', () => {
    const sendRequest = (payload: Partial<ProductMovementDTO>) =>
      request(app.getHttpServer()).post('/registrar-compra').send(payload);

    describe('when the product is not defined', () => {
      let payload: Partial<ProductMovementDTO>;
      beforeEach(async () => {
        payload = {
          id: Faker.lorem.word(10),
          cantidad: Number(Faker.finance.amount(1, 10)),
          idProducto: Faker.lorem.word(10),
          nombreProducto: Faker.commerce.productName(),
        };
        response = await sendRequest(payload);
      });

      it('should return 200', () => {
        response.expect(200);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
