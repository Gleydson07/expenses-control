import { Module } from '@nestjs/common';
import { ReferenceMonthController } from './reference_month.controller';
import { ReferenceMonthRepository } from 'src/app/repositories/reference-month.repository';
import { DrizzleReferenceMonthRepository } from 'src/infra/database/drizzle/repositories/drizzle-reference-month.repository';
import { CreateReferenceMonthsUseCase } from './usecases/create-reference-months.usecase';
import { UpdateStatusReferenceMonthUseCase } from './usecases/update-reference-month.usecase';

@Module({
  controllers: [ReferenceMonthController],
  providers: [
    CreateReferenceMonthsUseCase,
    UpdateStatusReferenceMonthUseCase,
    {
      provide: ReferenceMonthRepository,
      useClass: DrizzleReferenceMonthRepository,
    },
  ],
  exports: [ReferenceMonthRepository],
})
export class ReferenceMonthModule {}
