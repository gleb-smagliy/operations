import { NestFactory } from '@nestjs/core';
import { ApiModule } from './processing.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  await app.listen(3040);
}
bootstrap();
