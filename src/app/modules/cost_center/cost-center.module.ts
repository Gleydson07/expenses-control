import { Module } from '@nestjs/common';
import { CostCenterController } from './cost-center.controller';
import { DrizzleCostCenterRepository } from 'src/infra/database/drizzle/repositories/drizzle-cost-center.repository';
import { CostCenterRepository } from 'src/app/repositories/const-center.repository';

@Module({
  controllers: [CostCenterController],
  providers: [
    {
      provide: CostCenterRepository,
      useClass: DrizzleCostCenterRepository,
    },
  ],
  exports: [CostCenterRepository],
})
export class CostCenterModule {}
