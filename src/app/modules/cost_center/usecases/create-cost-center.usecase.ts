import { Injectable } from '@nestjs/common';
import { CostCenterRepository } from 'src/app/repositories/cost-center.repository';
import { ResponseCostCenterDto } from '../dto/response-cost-center.dto';
import { CreateCostCenterDto } from '../dto/create-cost-center.dto';
import { ManagementRepository } from 'src/app/repositories/management.repository';

@Injectable()
export class CreateCostCenterUseCase {
  constructor(
    private readonly costCenterRepository: CostCenterRepository,
    private readonly managementRepository: ManagementRepository,
  ) {}

  async execute(
    userId: number,
    data: CreateCostCenterDto,
  ): Promise<ResponseCostCenterDto> {
    const costCenter = await this.costCenterRepository.create(userId, {
      title: data.title,
      description: data?.description,
    });

    await this.managementRepository.create({
      userId,
      costCenterId: costCenter.id,
      roleId: 1, //:TODO Alterar por uma busca pelo admin
    });

    return costCenter;
  }
}
