import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { FinancialPlanRepository } from 'src/app/repositories/financial-plan.repository';
import { ResponseFinancialPlanWithTransactionUseCaseDto } from '../dto/response-financial-plan-with-transaction.usecase.dto';

@Injectable()
export class FindByReferenceMonthIdFinancialPlanUseCase {
  private readonly logger = new Logger(
    FindByReferenceMonthIdFinancialPlanUseCase.name,
  );

  constructor(
    private readonly financialPlanRepository: FinancialPlanRepository,
  ) {}

  async execute(
    referenceMonthId: number,
  ): Promise<ResponseFinancialPlanWithTransactionUseCaseDto[]> {
    try {
      return await this.financialPlanRepository.findAll(referenceMonthId);
    } catch (error) {
      this.logger.error(
        `Error finding financial plans with transactions: ${error.message}`,
      );
      throw new BadRequestException(
        `Error finding financial plans with transactions: ${error.message}`,
      );
    }
  }
}
