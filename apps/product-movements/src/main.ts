import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ProductMovementsModule } from './product-movements.module';
import { Configuration } from '@app/common';

const {
  api: { port },
} = Configuration;

async function bootstrap() {
  const app = await NestFactory.create(ProductMovementsModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('This is an example of an API with nestjs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
