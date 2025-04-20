import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialPlanDto } from './create-financial-plan.dto';

export class UpdateFinancialPlanDto extends PartialType(
  CreateFinancialPlanDto,
) {}
