import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle.service';
import { financialPlans } from 'drizzle/schema.drizzle';
import { desc, eq } from 'drizzle-orm';
import { FinancialPlanRepository } from 'src/app/repositories/financial-plan.repository';
import { CreateFinancialPlanDto } from 'src/app/modules/financial_plan/dto/create-financial-plan.dto';
import { ResponseFinancialPlanDto } from 'src/app/modules/financial_plan/dto/response-financial-plan.dto';
import { financialPlanTypeEnum } from 'src/app/modules/financial_plan/dto/financial-plan-type.enum';
import { UpdateFinancialPlanDto } from 'src/app/modules/financial_plan/dto/update-financial-plan.dto';

@Injectable()
export class DrizzleFinancialPlanRepository implements FinancialPlanRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(
    createFinancialPlan: CreateFinancialPlanDto,
  ): Promise<ResponseFinancialPlanDto> {
    const financialPlan = await this.drizzleService.db
      .insert(financialPlans)
      .values(createFinancialPlan)
      .returning();

    return {
      id: financialPlan[0].id,
      title: financialPlan[0].title,
      description: financialPlan[0].description,
      type: financialPlan[0].type as financialPlanTypeEnum,
      categoryId: financialPlan[0].categoryId,
      createdAt: financialPlan[0].createdAt,
      updatedAt: financialPlan[0].updatedAt,
    };
  }

  async findAll(): Promise<ResponseFinancialPlanDto[]> {
    const finPlans = await this.drizzleService.db
      .select({
        id: financialPlans.id,
        title: financialPlans.title,
        description: financialPlans.description,
        type: financialPlans.type,
        categoryId: financialPlans.categoryId,
        createdAt: financialPlans.createdAt,
        updatedAt: financialPlans.updatedAt,
      })
      .from(financialPlans)
      .orderBy(desc(financialPlans.createdAt));

    return finPlans.map((financialPlan) => ({
      id: financialPlan.id,
      title: financialPlan.title,
      description: financialPlan.description,
      type: financialPlan.type as financialPlanTypeEnum,
      categoryId: financialPlan.categoryId,
      createdAt: financialPlan.createdAt,
      updatedAt: financialPlan.updatedAt,
    }));
  }

  async findOne(financialPlanId: number): Promise<ResponseFinancialPlanDto> {
    const finPlan = await this.drizzleService.db
      .select({
        id: financialPlans.id,
        title: financialPlans.title,
        description: financialPlans.description,
        type: financialPlans.type,
        categoryId: financialPlans.categoryId,
        createdAt: financialPlans.createdAt,
        updatedAt: financialPlans.updatedAt,
      })
      .from(financialPlans)
      .where(eq(financialPlans.id, financialPlanId))
      .then((res) => res[0]);

    return {
      id: finPlan.id,
      title: finPlan.title,
      description: finPlan.description,
      type: finPlan.type as financialPlanTypeEnum,
      categoryId: finPlan.categoryId,
      createdAt: finPlan.createdAt,
      updatedAt: finPlan.updatedAt,
    };
  }

  async update(
    financialPlanId: number,
    updateFinancialPlan: UpdateFinancialPlanDto,
  ): Promise<ResponseFinancialPlanDto> {
    const finPlan = await this.drizzleService.db
      .update(financialPlans)
      .set(updateFinancialPlan)
      .where(eq(financialPlans.id, financialPlanId))
      .returning()
      .then((res) => res[0]);

    return {
      id: finPlan.id,
      title: finPlan.title,
      description: finPlan.description,
      type: finPlan.type as financialPlanTypeEnum,
      categoryId: finPlan.categoryId,
      createdAt: finPlan.createdAt,
      updatedAt: finPlan.updatedAt,
    };
  }

  async remove(financialPlanId: number): Promise<void> {
    await this.drizzleService.db
      .delete(financialPlans)
      .where(eq(financialPlans.id, financialPlanId));

    return;
  }
}
