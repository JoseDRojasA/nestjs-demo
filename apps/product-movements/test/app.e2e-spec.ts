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
import { Product, ProductMovement } from '@app/database/entities';
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
    let inventoryBefore: number;
    let productId: string;
    let product: Product;
    const amount = Number(Faker.finance.amount(1, 10, 0));

    const sendRequest = (payload: Partial<ProductMovementDTO>) =>
      request(app.getHttpServer()).post('/registrar-compra').send(payload);

    describe('when the product is not created', () => {
      beforeEach(async () => {
        productId = Faker.lorem.word(10);
        payload = {
          id: Faker.lorem.word(10),
          cantidad: amount,
          idProducto: productId,
          nombreProducto: Faker.commerce.productName(),
        };
        productsCountBefore = await productRepository.count();
        productMovementCountBefore = await productMovementRepository.count();
        inventoryBefore = await productMovementRepository.getInventory(
          productId,
        );
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

      it('should increase inventory', async () => {
        const inventoryAfter = await productMovementRepository.getInventory(
          productId,
        );
        expect(inventoryAfter - inventoryBefore).toBe(amount);
      });
    });

    describe('when the product is already created', () => {
      beforeEach(async () => {
        product = await factory(Product)().create();
        productId = product.id;
        payload = {
          id: Faker.lorem.word(10),
          cantidad: amount,
          idProducto: productId,
          nombreProducto: product.name,
        };
        productsCountBefore = await productRepository.count();
        productMovementCountBefore = await productMovementRepository.count();
        inventoryBefore = await productMovementRepository.getInventory(
          productId,
        );
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

      it('should increase inventory', async () => {
        const inventoryAfter = await productMovementRepository.getInventory(
          productId,
        );
        expect(inventoryAfter - inventoryBefore).toBe(amount);
      });
    });

    describe('when monthly purchase is more than 30', () => {
      beforeEach(async () => {
        product = await factory(Product)().create();
        productId = product.id;
        await factory(ProductMovement)({
          productId,
          amount: Number(Faker.finance.amount(31, 40, 0)),
        }).create();
        inventoryBefore = await productMovementRepository.getInventory(
          productId,
        );
        payload = {
          id: Faker.lorem.word(10),
          cantidad: Number(Faker.finance.amount(1, 10, 0)),
          idProducto: productId,
          nombreProducto: product.name,
        };
        response = await sendRequest(payload);
      });

      it('should return 403', () => {
        expect(response.statusCode).toBe(403);
      });

      it('should not increase inventory', async () => {
        const inventoryAfter = await productMovementRepository.getInventory(
          productId,
        );
        expect(inventoryAfter - inventoryBefore).toBe(0);
      });
    });

    describe('when monthly purchase is more than 30 with incoming amount', () => {
      beforeEach(async () => {
        product = await factory(Product)().create();
        productId = product.id;
        await factory(ProductMovement)({
          productId,
          amount: Number(Faker.finance.amount(25, 30, 0)),
        }).create();
        inventoryBefore = await productMovementRepository.getInventory(
          productId,
        );
        payload = {
          id: Faker.lorem.word(10),
          cantidad: Number(Faker.finance.amount(11, 20, 0)),
          idProducto: productId,
          nombreProducto: product.name,
        };
        response = await sendRequest(payload);
      });

      it('should return 403', () => {
        expect(response.statusCode).toBe(403);
      });

      it('should not increase inventory', async () => {
        const inventoryAfter = await productMovementRepository.getInventory(
          productId,
        );
        expect(inventoryAfter - inventoryBefore).toBe(0);
      });
    });
  });

  afterAll(async () => {
    await knexCleanerService.closeKnex();
    await tearDownDatabase();
    await app.close();
  });
});
