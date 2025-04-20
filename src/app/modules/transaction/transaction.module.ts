import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from 'src/app/repositories/transaction.repository';
import { DrizzleTransactionRepository } from 'src/infra/database/drizzle/repositories/drizzle-transaction-role.repository';

@Module({
  controllers: [TransactionController],
  providers: [
    {
      provide: TransactionRepository,
      useClass: DrizzleTransactionRepository,
    },
  ],
  exports: [TransactionRepository],
})
export class TransactionModule {}
