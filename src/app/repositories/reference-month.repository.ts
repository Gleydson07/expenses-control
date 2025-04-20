import { Injectable } from '@nestjs/common';
import { CreateReferenceMonthDto } from '../modules/reference_month/dto/create-reference-month.dto';
import { ResponseReferenceMonthDto } from '../modules/reference_month/dto/response-reference-month.dto';
import { UpdateReferenceMonthDto } from '../modules/reference_month/dto/update-reference-month.dto';

@Injectable()
export abstract class ReferenceMonthRepository {
  abstract createMany(
    createReferenceMonth: CreateReferenceMonthDto[],
  ): Promise<ResponseReferenceMonthDto[]>;

  abstract findByCostCenterId(
    costCenterId: number,
  ): Promise<ResponseReferenceMonthDto[]>;

  abstract findById(id: number): Promise<ResponseReferenceMonthDto>;

  abstract update(
    referenceMonthId: number,
    updateReferenceMonth: UpdateReferenceMonthDto,
  ): Promise<ResponseReferenceMonthDto>;

  abstract delete(refMonthId: number): Promise<void>;
}
