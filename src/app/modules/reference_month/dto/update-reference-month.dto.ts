import { PartialType } from '@nestjs/mapped-types';
import { CreateReferenceMonthDto } from './create-reference-month.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { referenceMonthStatusEnum } from './reference-month-status.enum';

export class UpdateReferenceMonthDto extends PartialType(
  CreateReferenceMonthDto,
) {
  @IsOptional()
  @IsEnum(referenceMonthStatusEnum)
  status: referenceMonthStatusEnum;
}
