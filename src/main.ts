import { loggerFn } from './logger.fn.middleware';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(loggerFn);
  await app.listen(3001);
}
bootstrap();
