import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: process.env.CLIENT_URL },
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Lime server')
    .setDescription('Lime API')
    .setVersion('1.0')
    .addTag('Lime')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
