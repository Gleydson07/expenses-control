import { transactionStatusEnum } from '../../transaction/dto/transaction-status.enum';
import { financialPlanTypeEnum } from './financial-plan-type.enum';

export class ResponseFinancialPlanWithTransactionUseCaseDto {
  id: number;
  referenceMonthId: number;
  financialPlanId: number;
  status: transactionStatusEnum;
  estimatedValue: number;
  value: number;
  paymentDate: Date;
  title: string;
  description: string;
  type: financialPlanTypeEnum;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}
