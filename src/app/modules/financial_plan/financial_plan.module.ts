import { Module } from '@nestjs/common';
import { FinancialPlanController } from './financial_plan.controller';
import { FinancialPlanRepository } from 'src/app/repositories/financial-plan.repository';
import { DrizzleFinancialPlanRepository } from 'src/infra/database/drizzle/repositories/drizzle-financial-plan.repository';
import { CreateFinancialPlanUseCase } from './usecases/create-financial-plan.usecase';
import { FindByReferenceMonthIdFinancialPlanUseCase } from './usecases/find-by-reference-month-id-financial-plans.usecase';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [TransactionModule],
  controllers: [FinancialPlanController],
  providers: [
    CreateFinancialPlanUseCase,
    FindByReferenceMonthIdFinancialPlanUseCase,
    {
      provide: FinancialPlanRepository,
      useClass: DrizzleFinancialPlanRepository,
    },
  ],
})
export class FinancialPlanModule {}
