import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

const HTTP_PORT = Number(process.env.PORT) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(HTTP_PORT, () => {
    console.log(`Server has been started on port: ${HTTP_PORT}`);
  });
}
bootstrap();
