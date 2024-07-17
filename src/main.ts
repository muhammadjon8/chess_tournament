import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
// import { LoggerFactory } from './logger/logger-factory';

async function start() {
  const PORT = process.env.PORT || 3030;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Chess Tournament')
    .setDescription('Manage your chess tournament with this website')
    .setVersion('1.0')
    .addTag('All chess tournament configurations')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.use(cookieParser());
  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Docs: http://localhost:3000/api/docs`);
  });
}
start();
