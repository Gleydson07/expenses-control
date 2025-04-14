import { Module } from '@nestjs/common';
import { CostCenterController } from './cost-center.controller';
import { DrizzleCostCenterRepository } from 'src/infra/database/drizzle/repositories/drizzle-cost-center.repository';
import { CostCenterRepository } from 'src/app/repositories/const-center.repository';
import { CreateCostCenterUseCase } from './usecases/create-cost-center.usecase';
import { ManagementModule } from '../management/management.module';

@Module({
  imports: [ManagementModule],
  controllers: [CostCenterController],
  providers: [
    CreateCostCenterUseCase,
    {
      provide: CostCenterRepository,
      useClass: DrizzleCostCenterRepository,
    },
  ],
  exports: [CostCenterRepository],
})
export class CostCenterModule {}
