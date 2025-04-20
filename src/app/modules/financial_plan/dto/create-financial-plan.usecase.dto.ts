import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { financialPlanTypeEnum } from './financial-plan-type.enum';
import { Type } from 'class-transformer';

class MonthDto {
  @IsNotEmpty()
  @IsNumber()
  referenceMonthId: number;

  @IsOptional()
  @IsNumber()
  estimatedValue?: number;

  @IsOptional()
  @IsNumber()
  value?: number;
}

export class CreateFinancialPlanUseCaseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(financialPlanTypeEnum)
  type: financialPlanTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MonthDto)
  months: MonthDto[];
}
