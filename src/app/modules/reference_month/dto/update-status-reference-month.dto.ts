import { IsEnum, IsNotEmpty } from 'class-validator';
import { referenceMonthStatusEnum } from './reference-month-status.enum';

export class UpdateStatusReferenceMonthUseCaseDto {
  @IsNotEmpty()
  @IsEnum(referenceMonthStatusEnum)
  status: referenceMonthStatusEnum;
}
