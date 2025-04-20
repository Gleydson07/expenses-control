import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCostCenterUseCaseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  startyear: number;

  @IsOptional()
  @IsNumber()
  startMonth: number;

  @IsNotEmpty()
  @IsNumber()
  toYear: number;
}
