import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  referenceMonthId: number;

  @IsNotEmpty()
  @IsNumber()
  financialPlanId: number;

  @IsNotEmpty()
  @IsNumber()
  estimatedValue: number;

  @IsOptional()
  @IsNumber()
  value: number;

  @IsOptional()
  @IsDateString()
  paymentDate: string;
}
