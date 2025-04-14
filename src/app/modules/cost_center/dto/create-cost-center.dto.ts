import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCostCenterDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
