import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ProductMovementsModule } from './product-movements.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductMovementsModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
