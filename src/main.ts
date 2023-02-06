import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';

const HTTP_PORT = Number(process.env.PORT) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = await readFile('./doc/api.yaml', { encoding: 'utf-8' });
  SwaggerModule.setup('doc', app, parse(document));

  await app.listen(HTTP_PORT, () => {
    console.log(`Server has been started on port: ${HTTP_PORT}`);
  });
}
bootstrap();
