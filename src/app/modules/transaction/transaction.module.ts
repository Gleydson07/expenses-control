import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';

@Module({
  controllers: [TransactionController],
  providers: [],
})
export class TransactionModule {}
