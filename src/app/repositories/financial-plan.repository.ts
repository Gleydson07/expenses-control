import { Injectable } from '@nestjs/common';
import { CreateFinancialPlanDto } from '../modules/financial_plan/dto/create-financial-plan.dto';
import { ResponseFinancialPlanDto } from '../modules/financial_plan/dto/response-financial-plan.dto';
import { UpdateFinancialPlanDto } from '../modules/financial_plan/dto/update-financial-plan.dto';
import { DatabaseSession } from 'src/core/database/database-session.interface';

@Injectable()
export abstract class FinancialPlanRepository {
  abstract create(
    createFinancialPlan: CreateFinancialPlanDto,
    session?: DatabaseSession,
  ): Promise<ResponseFinancialPlanDto>;

  abstract findAll(): Promise<ResponseFinancialPlanDto[]>;

  abstract findOne(
    financialPlanId: number,
    session?: DatabaseSession,
  ): Promise<ResponseFinancialPlanDto>;

  abstract update(
    financialPlanId: number,
    updateFinancialPlan: UpdateFinancialPlanDto,
    session?: DatabaseSession,
  ): Promise<ResponseFinancialPlanDto>;

  abstract remove(
    financialPlanId: number,
    session?: DatabaseSession,
  ): Promise<void>;
}
