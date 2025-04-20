import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CostCenterRepository } from 'src/app/repositories/cost-center.repository';
import { ResponseCostCenterDto } from '../dto/response-cost-center.dto';
import { ManagementRepository } from 'src/app/repositories/management.repository';
import { RoleRepository } from 'src/app/repositories/role.repository';
import { ReferenceMonthRepository } from 'src/app/repositories/reference-month.repository';
import { CreateCostCenterUseCaseDto } from '../dto/create-cost-center.usecase.dto';
import { generateMonthAndYearByInterval } from '../utils/generate-month-and-year-by-interval.utils';
import { DrizzleService } from 'src/infra/database/drizzle/drizzle.service';
import { referenceMonthStatusEnum } from '../../reference_month/dto/reference-month-status.enum';

@Injectable()
export class CreateCostCenterUseCase {
  private readonly logger = new Logger(CreateCostCenterUseCase.name);

  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly costCenterRepository: CostCenterRepository,
    private readonly managementRepository: ManagementRepository,
    private readonly roleRepository: RoleRepository,
    private readonly referenceMonthRepository: ReferenceMonthRepository,
  ) {}

  async execute(
    userId: number,
    data: CreateCostCenterUseCaseDto,
  ): Promise<ResponseCostCenterDto> {
    try {
      return await this.drizzleService.db.transaction(async (tx) => {
        this.logger.log(
          `Creating cost center ${data.title} for user ${userId}...`,
        );

        const costCenter = await this.costCenterRepository.create(
          userId,
          {
            title: data.title,
            description: data?.description,
          },
          tx,
        );

        this.logger.log(`Find role admin...`);
        const role = await this.roleRepository.findOneByTitle('admin', tx);

        this.logger.log(`Creating management...`);
        await this.managementRepository.create(
          {
            userId,
            costCenterId: costCenter.id,
            roleId: role?.id || 1,
          },
          tx,
        );

        this.logger.log(`Generating reference months by interval...`);
        const period = generateMonthAndYearByInterval({
          finalYear: data.toYear,
          startMonth: data?.startMonth,
          startYear: data?.startyear,
        });

        const referenceMonths = period.map((item) => ({
          costCenterId: costCenter.id,
          month: item.month,
          year: item.year,
          status: referenceMonthStatusEnum.PLANNING,
        }));

        this.logger.log(`Creating reference months...`);
        await this.referenceMonthRepository.createMany(referenceMonths, tx);

        this.logger.log(`Cost center ${data.title} created successfully.`);

        return costCenter;
      });
    } catch (error) {
      this.logger.error(`Error creating cost center: ${error.message}`);
      throw new BadRequestException(
        `Error creating cost center: ${error.message}`,
      );
    }
  }
}
