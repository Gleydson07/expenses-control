import { Module } from '@nestjs/common';
import { ManagementRepository } from 'src/app/repositories/management.repository';
import { DrizzleManagementRepository } from 'src/infra/database/drizzle/repositories/drizzle-management.repository';

@Module({
  controllers: [],
  providers: [
    {
      provide: ManagementRepository,
      useClass: DrizzleManagementRepository,
    },
  ],
  exports: [ManagementRepository],
})
export class ManagementModule {}
