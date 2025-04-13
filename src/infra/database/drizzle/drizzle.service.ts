import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres, { Sql } from 'postgres';
import { ConfigService } from '@nestjs/config';
import * as schema from '../../../../drizzle/schema.drizzle';

@Injectable()
export class DrizzleService implements OnModuleDestroy {
  private client: Sql;
  public db: ReturnType<typeof drizzle>;

  constructor(private configService: ConfigService) {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    this.client = postgres(this.configService.get<string>('DATABASE_URL'));
    this.db = drizzle(this.client, { schema });
  }

  async onModuleDestroy() {
    await this.client.end();
  }
}
