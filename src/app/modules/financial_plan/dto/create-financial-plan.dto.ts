import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { financialPlanTypeEnum } from './financial-plan-type.enum';

export class CreateFinancialPlanDto {
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
}
