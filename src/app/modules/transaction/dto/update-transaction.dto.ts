import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { transactionStatusesEnum } from './transaction-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsOptional()
  @IsEnum(transactionStatusesEnum)
  status: transactionStatusesEnum;
}
