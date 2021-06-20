import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ProductMovementsModule } from '../src/product-movements.module';
import { ProductMovementDTO } from '../src/dto/product-movement.dto';

import * as request from 'supertest';
import * as Faker from 'faker';
import { KnexCleanerService } from '@app/common/testing/knex-cleaner.service';
import {
  ProductMovementRepository,
  ProductRepository,
} from '@app/database/repositories';
import { Product } from '@app/database/entities';
import { factory, useSeeding, tearDownDatabase } from 'typeorm-seeding';

describe('ProductMovementsController (e2e)', () => {
  let app: INestApplication;
  let knexCleanerService: KnexCleanerService;
  let productMovementRepository: ProductMovementRepository;
  let productRepository: ProductRepository;
  let response;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductMovementsModule],
      providers: [KnexCleanerService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await useSeeding();
    knexCleanerService = app.get<KnexCleanerService>(KnexCleanerService);
    productMovementRepository = app.get<ProductMovementRepository>(
      ProductMovementRepository,
    );
    productRepository = app.get<ProductRepository>(ProductRepository);
  });

  beforeEach(async () => {
    await knexCleanerService.cleanDB();
  });

  describe('(POST) /registrar-compra', () => {
    let payload: Partial<ProductMovementDTO>;
    let productsCountBefore: number;
    let productMovementCountBefore: number;

    const sendRequest = (payload: Partial<ProductMovementDTO>) =>
      request(app.getHttpServer()).post('/registrar-compra').send(payload);

    describe('when the product is not created', () => {
      beforeEach(async () => {
        payload = {
          id: Faker.lorem.word(10),
          cantidad: Number(Faker.finance.amount(1, 10, 0)),
          idProducto: Faker.lorem.word(10),
          nombreProducto: Faker.commerce.productName(),
        };
        productsCountBefore = await productRepository.count();
        productMovementCountBefore = await productMovementRepository.count();
        response = await sendRequest(payload);
      });

      it('should return 201', () => {
        expect(response.statusCode).toBe(201);
      });

      it('should create a new product in the db', async () => {
        const productsCountAfter = await productRepository.count();
        expect(productsCountAfter - productsCountBefore).toBe(1);
      });

      it('should create a new product movement in the db', async () => {
        const productMovementsCountAfter = await productRepository.count();
        expect(productMovementsCountAfter - productMovementCountBefore).toBe(1);
      });
    });

    describe('when the product is already created', () => {
      let product: Product;
      beforeEach(async () => {
        product = await factory(Product)().create();
        payload = {
          id: Faker.lorem.word(10),
          cantidad: Number(Faker.finance.amount(1, 10, 0)),
          idProducto: product.id,
          nombreProducto: product.name,
        };
        productsCountBefore = await productRepository.count();
        productMovementCountBefore = await productMovementRepository.count();
        response = await sendRequest(payload);
      });

      it('should return 201', () => {
        expect(response.statusCode).toBe(201);
      });

      it('should not create a new product in the db', async () => {
        const productsCountAfter = await productRepository.count();
        expect(productsCountAfter - productsCountBefore).toBe(0);
      });

      it('should create a new product movement in the db', async () => {
        const productMovementsCountAfter = await productRepository.count();
        expect(productMovementsCountAfter - productMovementCountBefore).toBe(1);
      });
    });
  });

  afterAll(async () => {
    await knexCleanerService.closeKnex();
    await tearDownDatabase();
    await app.close();
  });
});
