/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('SERVER_PORT');
  const HOST = configService.get<string>('SERVER_HOST');

  await app.listen(PORT, HOST);
  console.log(`http://${HOST}:${PORT}`);
}
bootstrap();
