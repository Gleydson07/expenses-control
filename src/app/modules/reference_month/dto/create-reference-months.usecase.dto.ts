import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateReferenceMonthsUseCaseDto {
  @IsNotEmpty()
  @IsNumber()
  costCenterId: number;

  @IsOptional()
  @IsNumber()
  startMonth?: number;

  @IsOptional()
  @IsNumber()
  startYear?: number;

  @IsNotEmpty()
  @IsNumber()
  endYear: number;
}
