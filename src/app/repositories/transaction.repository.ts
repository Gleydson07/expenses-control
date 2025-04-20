import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../modules/transaction/dto/create-transaction.dto';
import { ResponseTransactionDto } from '../modules/transaction/dto/response-transaction.dto';
import { UpdateTransactionDto } from '../modules/transaction/dto/update-transaction.dto';
import { DatabaseSession } from 'src/core/database/database-session.interface';

@Injectable()
export abstract class TransactionRepository {
  abstract create(
    createTransaction: CreateTransactionDto,
    session?: DatabaseSession,
  ): Promise<ResponseTransactionDto>;

  abstract findAll(
    session?: DatabaseSession,
  ): Promise<ResponseTransactionDto[]>;

  abstract findOne(
    roleId: number,
    session?: DatabaseSession,
  ): Promise<ResponseTransactionDto>;

  abstract update(
    roleId: number,
    updateTransaction: UpdateTransactionDto,
    session?: DatabaseSession,
  ): Promise<ResponseTransactionDto>;

  abstract remove(roleId: number, session?: DatabaseSession): Promise<void>;
}
