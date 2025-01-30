import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const context = await NestFactory.createApplicationContext(AppModule);
  const configService = context.get(ConfigService);
  const NATS_URL = configService.get<string>('NATS_URL');
  await context.close();
  const logger = new Logger('Main')
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [NATS_URL],
      },
    },
  );

  await app.listen()
  logger.log('Shipping-Address-Microservice is running')
}
bootstrap();
