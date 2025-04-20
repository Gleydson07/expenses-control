import { referenceMonthStatusEnum } from './reference-month-status.enum';

export class ResponseReferenceMonthDto {
  id: number;
  costCenterId: number;
  month: number;
  year: number;
  status: referenceMonthStatusEnum;
  expensesTotalValue: number;
  incomesTotalValue: number;
  balance: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
