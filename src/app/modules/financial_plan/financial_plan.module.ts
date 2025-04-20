import { Module } from '@nestjs/common';
import { FinancialPlanController } from './financial_plan.controller';

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
