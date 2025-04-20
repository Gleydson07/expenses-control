import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { referenceMonthStatusEnum } from './reference-month-status.enum';

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
  @IsEnum(referenceMonthStatusEnum)
  status: referenceMonthStatusEnum;

  @IsOptional()
  @IsString()
  notes?: string;
}
