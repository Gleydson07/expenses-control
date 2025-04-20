import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { transactionStatusEnum } from './transaction-status.enum';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsOptional()
  @IsEnum(transactionStatusEnum)
  status: transactionStatusEnum;
}
