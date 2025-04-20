import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { referenceMonthStatusesEnum } from './reference-month-status.enum';

export class CreateReferenceMonthDto {
  @IsNotEmpty()
  @IsNumber()
  costCenterId: number;

  @IsNotEmpty()
  @IsNumber()
  month: number;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsEnum(referenceMonthStatusesEnum)
  status: referenceMonthStatusesEnum;

  @IsOptional()
  @IsString()
  notes?: string;
}
