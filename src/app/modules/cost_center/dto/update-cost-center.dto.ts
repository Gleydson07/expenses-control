import { PartialType } from '@nestjs/mapped-types';
import { CreateCostCenterDto } from './create-cost-center.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCostCenterDto extends PartialType(CreateCostCenterDto) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
