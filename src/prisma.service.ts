
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    const logger = new Logger(PrismaService.name)
    logger.log('PrismaService has been initialized')
    await this.$connect();
  }
}
