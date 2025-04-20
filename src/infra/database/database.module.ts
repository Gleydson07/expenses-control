import { Global, Module } from '@nestjs/common';
import { DrizzleService } from './drizzle/drizzle.service';
import { DrizzleTransactionManager } from './drizzle/managers/drizzle-transaction.manager';
import { TransactionManager } from 'src/core/database/abstract-transaction-manager.manager';

@Global()
@Module({
  providers: [
    DrizzleService,
    {
      provide: TransactionManager,
      useClass: DrizzleTransactionManager,
    },
  ],
  exports: [DrizzleService, TransactionManager],
})
export class DatabaseModule {}
