import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
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
