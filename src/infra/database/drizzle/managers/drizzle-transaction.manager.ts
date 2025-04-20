import { Injectable } from '@nestjs/common';
import { DatabaseSession } from 'src/core/database/database-session.interface';
import { DrizzleService } from '../drizzle.service';
import { TransactionManager } from 'src/core/database/abstract-transaction-manager.manager';

@Injectable()
export class DrizzleTransactionManager extends TransactionManager {
  constructor(private readonly drizzleService: DrizzleService) {
    super();
  }

  async runInTransaction<T>(
    fn: (context: DatabaseSession) => Promise<T>,
  ): Promise<T> {
    return this.drizzleService.db.transaction(async (tx) => {
      return await fn(tx as unknown as DatabaseSession);
    });
  }
}
