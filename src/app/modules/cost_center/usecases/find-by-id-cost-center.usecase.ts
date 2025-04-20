import { Injectable } from '@nestjs/common';
import { CostCenterRepository } from 'src/app/repositories/cost-center.repository';
import { ManagementRepository } from 'src/app/repositories/management.repository';
import { ResponseCostCenterWithAggregatesDto } from '../dto/response-cost-center.dto';
import { ReferenceMonthRepository } from 'src/app/repositories/reference-month.repository';

@Injectable()
export class FindByIdCostCenterUseCase {
  constructor(
    private readonly costCenterRepository: CostCenterRepository,
    private readonly managementRepository: ManagementRepository,
    private readonly referenceMonthRepository: ReferenceMonthRepository,
  ) {}

  async execute(
    constCenterId: number,
    userId: number,
  ): Promise<ResponseCostCenterWithAggregatesDto> {
    const costCenter = await this.costCenterRepository.findOne(
      constCenterId,
      userId,
    );
    if (!costCenter) return null;

    const managements = await this.managementRepository.findByCostCenterId(
      costCenter.id,
    );

    const referenceMonths =
      await this.referenceMonthRepository.findByCostCenterId(costCenter.id);

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
          costCenterId: management.costCenterId,
          userId: management.userId,
          roleId: management.roleId,
          createdAt: management.createdAt,
          updatedAt: management.updatedAt,
        })) || [],
      referenceMonths:
        referenceMonths.map((referenceMonth) => ({
          id: referenceMonth.id,
          costCenterId: referenceMonth.costCenterId,
          month: referenceMonth.month,
          year: referenceMonth.year,
          status: referenceMonth.status,
          expensesTotalValue: referenceMonth.expensesTotalValue,
          incomesTotalValue: referenceMonth.incomesTotalValue,
          balance: referenceMonth.balance,
          createdAt: referenceMonth.createdAt,
          updatedAt: referenceMonth.updatedAt,
        })) || [],
    };
  }
}
