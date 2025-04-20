import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ReferenceMonthRepository } from 'src/app/repositories/reference-month.repository';
import { generateMonthAndYearByInterval } from '../../cost_center/utils/generate-month-and-year-by-interval.utils';
import { ResponseReferenceMonthDto } from '../dto/response-reference-month.dto';
import { referenceMonthStatusEnum } from '../dto/reference-month-status.enum';
import { CreateReferenceMonthsUseCaseDto } from '../dto/create-reference-months.usecase.dto';

@Injectable()
export class CreateReferenceMonthsUseCase {
  private readonly logger = new Logger(CreateReferenceMonthsUseCase.name);

  constructor(
    private readonly referenceMonthRepository: ReferenceMonthRepository,
  ) {}

  async execute(
    data: CreateReferenceMonthsUseCaseDto,
  ): Promise<ResponseReferenceMonthDto[]> {
    try {
      this.logger.log(`Generating reference months by interval...`);
      const period = generateMonthAndYearByInterval({
        finalYear: data.endYear,
        startMonth: data?.startMonth,
        startYear: data?.startYear,
      });

      const referenceMonths = period.map((item) => ({
        costCenterId: data.costCenterId,
        month: item.month,
        year: item.year,
        status: referenceMonthStatusEnum.PLANNING,
      }));

      this.logger.log(`Creating reference months...`);
      return await this.referenceMonthRepository.createMany(referenceMonths);
    } catch (error) {
      this.logger.error(`Error creating reference months: ${error.message}`);
      throw new BadRequestException(
        `Error creating reference months: ${error.message}`,
      );
    }
  }
}
