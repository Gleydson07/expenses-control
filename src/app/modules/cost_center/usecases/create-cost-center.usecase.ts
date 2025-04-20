import { Injectable, Logger } from '@nestjs/common';
import { CostCenterRepository } from 'src/app/repositories/cost-center.repository';
import { ResponseCostCenterDto } from '../dto/response-cost-center.dto';
import { ManagementRepository } from 'src/app/repositories/management.repository';
import { RoleRepository } from 'src/app/repositories/role.repository';
import { ReferenceMonthRepository } from 'src/app/repositories/reference-month.repository';
import { CreateCostCenterUseCaseDto } from '../dto/create-cost-center.usecase.dto';
import { referenceMonthStatusesEnum } from '../../reference_month/dto/reference-month-status.enum';

@Injectable()
export class CreateCostCenterUseCase {
  logger = new Logger(CreateCostCenterUseCase.name);

  constructor(
    private readonly costCenterRepository: CostCenterRepository,
    private readonly managementRepository: ManagementRepository,
    private readonly roleRepository: RoleRepository,
    private readonly referenceMonthRepository: ReferenceMonthRepository,
  ) {}

  async execute(
    userId: number,
    data: CreateCostCenterUseCaseDto,
  ): Promise<ResponseCostCenterDto> {
    this.logger.log(`Creating cost center ${data.title} for user ${userId}...`);

    const costCenter = await this.costCenterRepository.create(userId, {
      title: data.title,
      description: data?.description,
    });

    this.logger.log(`Find role admin...`);
    const role = await this.roleRepository.findOneByTitle('admin');

    this.logger.log(`Creating management...`);
    await this.managementRepository.create({
      userId,
      costCenterId: costCenter.id,
      roleId: role?.id || 1,
    });

    this.logger.log(`Generating reference months by interval...`);
    const period = generateMonthAndYearByInterval(
      data.startyear,
      data.startMonth,
      data.toYear,
    );

    const referenceMonths = period.map((item) => {
      return {
        costCenterId: costCenter.id,
        month: item.month,
        year: item.year,
        status: referenceMonthStatusesEnum.PLANNING,
      };
    });

    this.logger.log(`Creating reference month...`);
    await this.referenceMonthRepository.createMany(referenceMonths);

    this.logger.log(`Cost center ${data.title} created successfully.`);

    return costCenter;
  }
}
