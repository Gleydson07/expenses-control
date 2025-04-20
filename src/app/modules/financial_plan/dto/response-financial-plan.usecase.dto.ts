import { financialPlanTypeEnum } from './financial-plan-type.enum';

export class ResponseFinancialPlanDto {
  id: number;
  title: string;
  description?: string;
  type: financialPlanTypeEnum;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}
