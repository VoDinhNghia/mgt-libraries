import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Library Management')
    .setDescription('The library management API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs-library', app, document);
  app.enableCors({
    origin: [
      'http://localhost:8000',
      'http://localhost:8001',
      'http://localhost:3001',
      'http://localhost:3002',
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  });
  await app.listen(3002);
  console.log('Server running on port 3002');
}
bootstrap();
