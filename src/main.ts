import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://studio.apollographql.com', 'https://moonkeyfinancas.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  })

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
