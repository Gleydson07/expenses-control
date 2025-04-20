import { Injectable } from '@nestjs/common';
import { DrizzleService, Transaction } from '../drizzle.service';
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
    tx?: Transaction,
  ): Promise<ResponseFinancialPlanDto> {
    const data = await (tx ? tx : this.drizzleService.db)
      .insert(financialPlans)
      .values(createFinancialPlan)
      .returning()
      .then((res) => res[0]);

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type as financialPlanTypeEnum,
      categoryId: data.categoryId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async findAll(tx?: Transaction): Promise<ResponseFinancialPlanDto[]> {
    const data = await (tx ? tx : this.drizzleService.db)
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

    return data.map((dt) => ({
      id: dt.id,
      title: dt.title,
      description: dt.description,
      type: dt.type as financialPlanTypeEnum,
      categoryId: dt.categoryId,
      createdAt: dt.createdAt,
      updatedAt: dt.updatedAt,
    }));
  }

  async findOne(
    financialPlanId: number,
    tx?: Transaction,
  ): Promise<ResponseFinancialPlanDto> {
    const data = await (tx ? tx : this.drizzleService.db)
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
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type as financialPlanTypeEnum,
      categoryId: data.categoryId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async update(
    financialPlanId: number,
    updateFinancialPlan: UpdateFinancialPlanDto,
    tx?: Transaction,
  ): Promise<ResponseFinancialPlanDto> {
    const data = await (tx ? tx : this.drizzleService.db)
      .update(financialPlans)
      .set(updateFinancialPlan)
      .where(eq(financialPlans.id, financialPlanId))
      .returning()
      .then((res) => res[0]);

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type as financialPlanTypeEnum,
      categoryId: data.categoryId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async remove(financialPlanId: number, tx?: Transaction): Promise<void> {
    await (tx ? tx : this.drizzleService.db)
      .delete(financialPlans)
      .where(eq(financialPlans.id, financialPlanId));
  }
}
