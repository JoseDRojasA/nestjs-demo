import { NestFactory } from '@nestjs/core';
import { ProductMovementsModule } from './product-movements.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductMovementsModule);
  await app.listen(3000);
}
bootstrap();
