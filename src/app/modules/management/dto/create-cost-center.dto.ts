import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateManagementDto {
  @IsNotEmpty()
  @IsNumber()
  costCenterId: number;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
