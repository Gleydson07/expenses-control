import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import { ConfigService } from '@nestjs/config';
import type {
  PostgresJsDatabase,
  PostgresJsTransaction,
} from 'drizzle-orm/postgres-js';
import * as schema from '../../../../drizzle/schema.drizzle';

// @ts-ignore
const postgres = require('postgres');

export type Transaction = PostgresJsTransaction<typeof schema, {}>;

@Injectable()
export class DrizzleService implements OnModuleDestroy {
  private client: any;
  public db: PostgresJsDatabase<typeof schema>;
  public schema = schema;

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
