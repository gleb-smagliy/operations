import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiModule } from './api.module';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  
  if(isDev) {
    app.enableCors();
  }

  const config = new DocumentBuilder()
    .setTitle('Operations docs')
    .setDescription('The operations API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3030);
}
bootstrap();
