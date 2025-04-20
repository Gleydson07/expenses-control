import { PartialType } from '@nestjs/mapped-types';
import { CreateReferenceMonthDto } from './create-reference-month.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { referenceMonthStatusesEnum } from './reference-month-status.enum';

export class UpdateReferenceMonthDto extends PartialType(
  CreateReferenceMonthDto,
) {
  @IsOptional()
  @IsEnum(referenceMonthStatusesEnum)
  status: referenceMonthStatusesEnum;
}
