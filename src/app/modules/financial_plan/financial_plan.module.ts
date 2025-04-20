import { Module } from '@nestjs/common';
import { FinancialPlanController } from './financial_plan.controller';
import { FinancialPlanRepository } from 'src/app/repositories/financial-plan.repository';
import { DrizzleFinancialPlanRepository } from 'src/infra/database/drizzle/repositories/drizzle-financial-plan.repository';

@Module({
  controllers: [FinancialPlanController],
  providers: [
    {
      provide: FinancialPlanRepository,
      useClass: DrizzleFinancialPlanRepository,
    },
  ],
})
export class FinancialPlanModule {}
