import { transactionStatusEnum } from './transaction-status.enum';

export class ResponseTransactionDto {
  id: number;
  referenceMonthId: number;
  financialPlanId: number;
  status: transactionStatusEnum;
  estimatedValue: number;
  value: number;
  paymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
