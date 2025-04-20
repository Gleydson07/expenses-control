import { Module } from '@nestjs/common';
import { CostCenterController } from './cost-center.controller';
import { DrizzleCostCenterRepository } from 'src/infra/database/drizzle/repositories/drizzle-cost-center.repository';
import { CostCenterRepository } from 'src/app/repositories/cost-center.repository';
import { CreateCostCenterUseCase } from './usecases/create-cost-center.usecase';
import { ManagementModule } from '../management/management.module';
import { FindByUserIdCostCenterUseCase } from './usecases/find-by-user-id-cost-center.usecase';
import { FindByIdCostCenterUseCase } from './usecases/find-by-id-cost-center.usecase';
import { UpdateCostCenterUseCase } from './usecases/update-cost-center.usecase';
import { DeleteCostCenterUseCase } from './usecases/delete-cost-center.usecase';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [ManagementModule, RoleModule],
  controllers: [CostCenterController],
  providers: [
    DeleteCostCenterUseCase,
    UpdateCostCenterUseCase,
    FindByIdCostCenterUseCase,
    FindByUserIdCostCenterUseCase,
    CreateCostCenterUseCase,
    {
      provide: CostCenterRepository,
      useClass: DrizzleCostCenterRepository,
    },
  ],
  exports: [CostCenterRepository],
})
export class CostCenterModule {}
