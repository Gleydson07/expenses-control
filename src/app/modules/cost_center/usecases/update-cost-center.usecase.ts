import { Injectable } from '@nestjs/common';
import { CostCenterRepository } from 'src/app/repositories/cost-center.repository';
import { ResponseCostCenterDto } from '../dto/response-cost-center.dto';
import { UpdateCostCenterDto } from '../dto/update-cost-center.dto';

@Injectable()
export class UpdateCostCenterUseCase {
  constructor(private readonly costCenterRepository: CostCenterRepository) {}

  async execute(
    costControlId: number,
    data: UpdateCostCenterDto,
  ): Promise<ResponseCostCenterDto> {
    const costCenter = await this.costCenterRepository.update(
      costControlId,
      data,
    );

    return costCenter;
  }
}
