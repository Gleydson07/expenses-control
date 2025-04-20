import { ResponseManagementDto } from '../../management/dto/response-cost-center.dto';
import { ResponseReferenceMonthDto } from '../../reference_month/dto/response-reference-month.dto';

export class ResponseCostCenterDto {
  id: number;
  title: string;
  description?: string;
  ownerUserId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ResponseCostCenterWithAggregatesDto extends ResponseCostCenterDto {
  managements: ResponseManagementDto[];
  referenceMonths: ResponseReferenceMonthDto[];
}
