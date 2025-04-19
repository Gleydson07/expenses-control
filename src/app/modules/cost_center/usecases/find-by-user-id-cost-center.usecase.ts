import { Injectable } from '@nestjs/common';
import { CostCenterRepository } from 'src/app/repositories/cost-center.repository';
import { ResponseCostCenterDto } from '../dto/response-cost-center.dto';

@Injectable()
export class FindByUserIdCostCenterUseCase {
  constructor(private readonly costCenterRepository: CostCenterRepository) {}

  async execute(userId: number): Promise<ResponseCostCenterDto[]> {
    return await this.costCenterRepository.findAll(userId);
  }
}
