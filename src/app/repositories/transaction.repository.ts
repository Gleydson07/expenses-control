import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../modules/transaction/dto/create-transaction.dto';
import { ResponseTransactionDto } from '../modules/transaction/dto/response-transaction.dto';
import { UpdateTransactionDto } from '../modules/transaction/dto/update-transaction.dto';

@Injectable()
export abstract class TransactionRepository {
  abstract create(
    createTransaction: CreateTransactionDto,
  ): Promise<ResponseTransactionDto>;

  abstract findAll(): Promise<ResponseTransactionDto[]>;

  abstract findOne(roleId: number): Promise<ResponseTransactionDto>;

  abstract update(
    roleId: number,
    updateTransaction: UpdateTransactionDto,
  ): Promise<ResponseTransactionDto>;

  abstract remove(roleId: number): Promise<void>;
}
