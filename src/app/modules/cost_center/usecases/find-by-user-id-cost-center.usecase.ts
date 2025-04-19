import { Injectable } from '@nestjs/common';
import { CostCenterRepository } from 'src/app/repositories/cost-center.repository';
import { ResponseCostCenterWithManagementsDto } from '../dto/response-cost-center.dto';
import { ManagementRepository } from 'src/app/repositories/management.repository';

@Injectable()
export class FindByUserIdCostCenterUseCase {
  constructor(
    private readonly costCenterRepository: CostCenterRepository,
    private readonly managementRepository: ManagementRepository,
  ) {}

  async execute(
    userId: number,
  ): Promise<ResponseCostCenterWithManagementsDto[]> {
    const costCenters = await this.costCenterRepository.findAll(userId);
    if (!costCenters?.length) return [];

    const costCenterIds = costCenters.map((cc) => cc.id);
    const managements =
      await this.managementRepository.findByCostCenterIds(costCenterIds);

    const managementMap = managements.reduce((acc, management) => {
      if (!acc[management.costCenterId]) {
        acc[management.costCenterId] = [];
      }

      acc[management.costCenterId].push({
        userId: management.userId,
        roleId: management.roleId,
        createdAt: management.createdAt,
        updatedAt: management.updatedAt,
      });

      return acc;
    }, {});

    return costCenters.map((cc) => ({
      id: cc.id,
      title: cc.title,
      description: cc.description,
      isActive: cc.isActive,
      createdAt: cc.createdAt,
      updatedAt: cc.updatedAt,
      managements: managementMap[cc.id] || [],
    }));
  }
}
