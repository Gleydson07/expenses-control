import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ReferenceMonthRepository } from 'src/app/repositories/reference-month.repository';
import { ResponseReferenceMonthDto } from '../dto/response-reference-month.dto';
import { UpdateStatusReferenceMonthUseCaseDto } from '../dto/update-status-reference-month.dto';

@Injectable()
export class UpdateStatusReferenceMonthUseCase {
  private readonly logger = new Logger(UpdateStatusReferenceMonthUseCase.name);

  constructor(
    private readonly referenceMonthRepository: ReferenceMonthRepository,
  ) {}

  async execute(
    referenceMonthId: number,
    data: UpdateStatusReferenceMonthUseCaseDto,
  ): Promise<ResponseReferenceMonthDto> {
    try {
      this.logger.log(`Updating reference month status...`);
      return await this.referenceMonthRepository.update(referenceMonthId, data);
    } catch (error) {
      this.logger.error(
        `Error updating reference month status: ${error.message}`,
      );
      throw new BadRequestException(
        `Error updating reference month status: ${error.message}`,
      );
    }
  }
}
