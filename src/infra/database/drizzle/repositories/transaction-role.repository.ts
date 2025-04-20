import { Injectable } from '@nestjs/common';
import { DrizzleService, Transaction } from '../drizzle.service';
import { transactions } from 'drizzle/schema.drizzle';
import { eq } from 'drizzle-orm';
import { TransactionRepository } from 'src/app/repositories/transaction.repository';
import { CreateTransactionDto } from 'src/app/modules/transaction/dto/create-transaction.dto';
import { ResponseTransactionDto } from 'src/app/modules/transaction/dto/response-transaction.dto';
import { transactionStatusEnum } from 'src/app/modules/transaction/dto/transaction-status.enum';
import { UpdateTransactionDto } from 'src/app/modules/transaction/dto/update-transaction.dto';

@Injectable()
export class DrizzleTransactionRepository implements TransactionRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(
    createTransaction: CreateTransactionDto,
    tx?: Transaction,
  ): Promise<ResponseTransactionDto> {
    const params = {
      ...createTransaction,
      status: transactionStatusEnum.PLANNING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const data = await (tx ? tx : this.drizzleService.db)
      .insert(transactions)
      .values(params)
      .returning()
      .then((res) => res[0]);

    return {
      id: data.id,
      referenceMonthId: data.referenceMonthId,
      financialPlanId: data.financialPlanId,
      status: data.status as transactionStatusEnum,
      estimatedValue: Number(data.estimatedValue),
      value: Number(data.value),
      paymentDate: data.paymentDate,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async findAll(tx?: Transaction): Promise<ResponseTransactionDto[]> {
    const data = await (tx ? tx : this.drizzleService.db)
      .select({
        id: transactions.id,
        referenceMonthId: transactions.referenceMonthId,
        financialPlanId: transactions.financialPlanId,
        status: transactions.status,
        estimatedValue: transactions.estimatedValue,
        value: transactions.value,
        paymentDate: transactions.paymentDate,
        createdAt: transactions.createdAt,
        updatedAt: transactions.updatedAt,
      })
      .from(transactions);

    return data.map((dt) => ({
      id: dt.id,
      referenceMonthId: dt.referenceMonthId,
      financialPlanId: dt.financialPlanId,
      status: dt.status as transactionStatusEnum,
      estimatedValue: Number(dt.estimatedValue),
      value: Number(dt.value),
      paymentDate: dt.paymentDate,
      createdAt: dt.createdAt,
      updatedAt: dt.updatedAt,
    }));
  }

  async findOne(
    transactionId: number,
    tx?: Transaction,
  ): Promise<ResponseTransactionDto> {
    const data = await (tx ? tx : this.drizzleService.db)
      .select({
        id: transactions.id,
        referenceMonthId: transactions.referenceMonthId,
        financialPlanId: transactions.financialPlanId,
        status: transactions.status,
        estimatedValue: transactions.estimatedValue,
        value: transactions.value,
        paymentDate: transactions.paymentDate,
        createdAt: transactions.createdAt,
        updatedAt: transactions.updatedAt,
      })
      .from(transactions)
      .where(eq(transactions.id, transactionId))
      .then((res) => res[0]);

    return {
      id: data.id,
      referenceMonthId: data.referenceMonthId,
      financialPlanId: data.financialPlanId,
      status: data.status as transactionStatusEnum,
      estimatedValue: Number(data.estimatedValue),
      value: Number(data.value),
      paymentDate: data.paymentDate,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async update(
    transactionId: number,
    updateTransaction: UpdateTransactionDto,
    tx?: Transaction,
  ): Promise<ResponseTransactionDto> {
    const params = {
      ...updateTransaction,
      updatedAt: new Date(),
    };

    const data = await (tx ? tx : this.drizzleService.db)
      .update(transactions)
      .set(params)
      .where(eq(transactions.id, transactionId))
      .returning()
      .then((res) => res[0]);

    return {
      id: data.id,
      referenceMonthId: data.referenceMonthId,
      financialPlanId: data.financialPlanId,
      status: data.status as transactionStatusEnum,
      estimatedValue: Number(data.estimatedValue),
      value: Number(data.value),
      paymentDate: data.paymentDate,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async remove(transactionId: number, tx?: Transaction): Promise<void> {
    await (tx ? tx : this.drizzleService.db)
      .delete(transactions)
      .where(eq(transactions.id, transactionId));
  }
}
