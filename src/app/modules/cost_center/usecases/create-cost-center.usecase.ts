import { Injectable } from '@nestjs/common';
import { CostCenterRepository } from 'src/app/repositories/cost-center.repository';
import { ResponseCostCenterDto } from '../dto/response-cost-center.dto';
import { CreateCostCenterDto } from '../dto/create-cost-center.dto';
import { ManagementRepository } from 'src/app/repositories/management.repository';
import { RoleRepository } from 'src/app/repositories/role.repository';

@Injectable()
export class CreateCostCenterUseCase {
  constructor(
    private readonly costCenterRepository: CostCenterRepository,
    private readonly managementRepository: ManagementRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(
    userId: number,
    data: CreateCostCenterDto,
  ): Promise<ResponseCostCenterDto> {
    const costCenter = await this.costCenterRepository.create(userId, {
      title: data.title,
      description: data?.description,
    });

    const role = await this.roleRepository.findOneByTitle('admin');

    await this.managementRepository.create({
      userId,
      costCenterId: costCenter.id,
      roleId: role?.id || 1,
    });

    return costCenter;
  }
}
