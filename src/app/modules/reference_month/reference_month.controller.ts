import { Controller } from '@nestjs/common';
import { ReferenceMonthService } from './reference_month.service';

@Controller('reference-month')
export class ReferenceMonthController {
  constructor(private readonly referenceMonthService: ReferenceMonthService) {}
}
