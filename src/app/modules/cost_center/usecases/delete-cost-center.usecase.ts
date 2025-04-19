import { Injectable } from '@nestjs/common';
import { CostCenterRepository } from 'src/app/repositories/cost-center.repository';

@Injectable()
export class DeleteCostCenterUseCase {
  constructor(private readonly costCenterRepository: CostCenterRepository) {}

  async execute(costControlId: number): Promise<void> {
    await this.costCenterRepository.remove(costControlId);
  }
}
