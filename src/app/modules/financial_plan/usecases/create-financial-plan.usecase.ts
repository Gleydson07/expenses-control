import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ResponseFinancialPlanDto } from '../dto/response-financial-plan.dto';
import { FinancialPlanRepository } from 'src/app/repositories/financial-plan.repository';
import { TransactionRepository } from 'src/app/repositories/transaction.repository';
import { CreateFinancialPlanUseCaseDto } from '../dto/create-financial-plan.usecase.dto';
import { CreateTransactionDto } from '../../transaction/dto/create-transaction.dto';
import { TransactionManager } from 'src/core/database/abstract-transaction-manager.manager';

@Injectable()
export class CreateFinancialPlanUseCase {
  private readonly logger = new Logger(CreateFinancialPlanUseCase.name);

  constructor(
    private readonly transaction: TransactionManager,
    private readonly financialPlanRepository: FinancialPlanRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(
    data: CreateFinancialPlanUseCaseDto,
  ): Promise<ResponseFinancialPlanDto> {
    try {
      return await this.transaction.runInTransaction(async (tx) => {
        this.logger.log(`Creating financial plan...`);
        const financialPlan = await this.financialPlanRepository.create(
          {
            title: data.title,
            description: data.description,
            type: data.type,
            categoryId: data.categoryId,
          },
          tx,
        );

        this.logger.log(`Creating transactions...`);
        const transactions: CreateTransactionDto[] = data.months.map(
          (month) => ({
            referenceMonthId: month.referenceMonthId,
            financialPlanId: financialPlan.id,
            estimatedValue: month.estimatedValue,
            value: month.value,
          }),
        );

        await this.transactionRepository.createMany(transactions, tx);

        this.logger.log(`Financial plan created successfully.`);
        return financialPlan;
      });
    } catch (error) {
      this.logger.error(`Error creating financial plans: ${error.message}`);
      throw new BadRequestException(
        `Error creating financial plans: ${error.message}`,
      );
    }
  }
}
