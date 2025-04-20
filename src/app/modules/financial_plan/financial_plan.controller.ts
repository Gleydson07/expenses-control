import { Controller, Get, Param, Post } from '@nestjs/common';
import { CreateFinancialPlanUseCase } from './usecases/create-financial-plan.usecase';
import { FindByReferenceMonthIdFinancialPlanUseCase } from './usecases/find-by-reference-month-id-financial-plans.usecase';
import { CreateFinancialPlanUseCaseDto } from './dto/create-financial-plan.usecase.dto';

@Controller()
export class FinancialPlanController {
  constructor(
    private readonly createFinancialPlanUseCase: CreateFinancialPlanUseCase,
    private readonly findByReferenceMonthIdFinancialPlanUseCase: FindByReferenceMonthIdFinancialPlanUseCase,
  ) {}

  @Post()
  async createFinancialPlan(
    createFinancialPlan: CreateFinancialPlanUseCaseDto,
  ) {
    return await this.createFinancialPlanUseCase.execute(createFinancialPlan);
  }

  @Get('/refrence-months/:referenceMonthId')
  async findByReferenceMonthId(
    @Param('referenceMonthId') referenceMonthId: number,
  ) {
    return await this.findByReferenceMonthIdFinancialPlanUseCase.execute(
      referenceMonthId,
    );
  }
}
