import { Module } from '@nestjs/common';
import { ReferenceMonthService } from './reference_month.service';
import { ReferenceMonthController } from './reference_month.controller';

@Module({
  controllers: [ReferenceMonthController],
  providers: [ReferenceMonthService],
})
export class ReferenceMonthModule {}
