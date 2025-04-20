import { Module } from '@nestjs/common';
import { ReferenceMonthController } from './reference_month.controller';
import { ReferenceMonthRepository } from 'src/app/repositories/reference-month.repository';
import { DrizzleReferenceMonthRepository } from 'src/infra/database/drizzle/repositories/drizzle-reference-month.repository';

@Module({
  controllers: [ReferenceMonthController],
  providers: [
    {
      provide: ReferenceMonthRepository,
      useClass: DrizzleReferenceMonthRepository,
    },
  ],
})
export class ReferenceMonthModule {}
