import { Injectable } from '@nestjs/common';
import { CostCenterRepository } from 'src/app/repositories/cost-center.repository';
import { ResponseCostCenterWithManagementsDto } from '../dto/response-cost-center.dto';
import { ManagementRepository } from 'src/app/repositories/management.repository';

@Injectable()
export class FindByIdCostCenterUseCase {
  constructor(
    private readonly costCenterRepository: CostCenterRepository,
    private readonly managementRepository: ManagementRepository,
  ) {}

  async execute(
    constCenterId: number,
    userId: number,
  ): Promise<ResponseCostCenterWithManagementsDto> {
    const costCenter = await this.costCenterRepository.findOne(
      constCenterId,
      userId,
    );
    if (!costCenter) return null;

    const managements = await this.managementRepository.findByCostCenterId(
      costCenter.id,
    );

    return {
      id: costCenter.id,
      title: costCenter.title,
      description: costCenter.description,
      ownerUserId: costCenter.ownerUserId,
      isActive: costCenter.isActive,
      createdAt: costCenter.createdAt,
      updatedAt: costCenter.updatedAt,
      managements:
        managements.map((management) => ({
          userId: management.userId,
          roleId: management.roleId,
          createdAt: management.createdAt,
          updatedAt: management.updatedAt,
        })) || [],
    };
  }
}
