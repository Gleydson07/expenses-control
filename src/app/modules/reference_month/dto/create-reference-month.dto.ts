import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @IsString()
  notes?: string;
}
