import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.AUTH_SERVICE_PORT ?? 3000);
  console.log(`Auth service is running on: ${await app.getUrl()}`);
}

console.log('Starting auth-service');
bootstrap();
