import { Injectable } from '@nestjs/common';
import { CostCenterRepository } from 'src/app/repositories/cost-center.repository';
import { ResponseCostCenterDto } from '../dto/response-cost-center.dto';

@Injectable()
export class FindByUserIdCostCenterUseCase {
  constructor(private readonly costCenterRepository: CostCenterRepository) {}

  async execute(userId: number): Promise<ResponseCostCenterDto[]> {
    const costCenters = await this.costCenterRepository.findAll(userId);

    if (!costCenters?.length) return [];

    return costCenters.map((cc) => ({
      id: cc.id,
      title: cc.title,
      description: cc.description,
      ownerUserId: cc.ownerUserId,
      isActive: cc.isActive,
      createdAt: cc.createdAt,
      updatedAt: cc.updatedAt,
    }));
  }
}
