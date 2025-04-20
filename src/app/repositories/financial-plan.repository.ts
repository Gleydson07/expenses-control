import { Injectable } from '@nestjs/common';
import { CreateFinancialPlanDto } from '../modules/financial_plan/dto/create-financial-plan.dto';
import { ResponseFinancialPlanDto } from '../modules/financial_plan/dto/response-financial-plan.dto';
import { UpdateFinancialPlanDto } from '../modules/financial_plan/dto/update-financial-plan.dto';

@Injectable()
export abstract class FinancialPlanRepository {
  abstract create(
    createFinancialPlan: CreateFinancialPlanDto,
  ): Promise<ResponseFinancialPlanDto>;

  abstract findAll(): Promise<ResponseFinancialPlanDto[]>;

  abstract findOne(financialPlanId: number): Promise<ResponseFinancialPlanDto>;

  abstract update(
    financialPlanId: number,
    updateFinancialPlan: UpdateFinancialPlanDto,
  ): Promise<ResponseFinancialPlanDto>;

  abstract remove(financialPlanId: number): Promise<void>;
}
