import { Injectable, OnModuleInit, OnModuleDestroy, INestApplication } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

	private readonly maxRetries = 5;
  private readonly retryDelay = 1000; // 1 second

  async onModuleInit() {
    await this.connectWithRetry();
  }

  private async connectWithRetry(retries = this.maxRetries) {
    try {
      await this.$connect();
      console.log('Database connected successfully');
    } catch (error) {
      if (retries > 0) {
        console.warn(`Connection failed, retrying (${retries} left)...`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        await this.connectWithRetry(retries - 1);
      } else {
        console.error('Failed to connect to database after retries:', error);
        throw error;
      }
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}