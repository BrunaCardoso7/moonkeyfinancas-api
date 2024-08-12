import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Mooonkey finanças')
    .setDescription(
      'Api RestFul desenvolvida com Nest.js, tem como proposta gestão de vendas e pedidos focado no ramo comercial. Com ela, posso registrar, atualizar, deletar e consultar usuário, pedidos e vendas',
    )
    .setVersion('1.0')
    .addTag('Moonkey')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
