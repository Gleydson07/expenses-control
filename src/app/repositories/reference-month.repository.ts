import { Injectable } from '@nestjs/common';
import { CreateReferenceMonthDto } from '../modules/reference_month/dto/create-reference-month.dto';
import { ResponseReferenceMonthDto } from '../modules/reference_month/dto/response-reference-month.dto';
import { UpdateReferenceMonthDto } from '../modules/reference_month/dto/update-reference-month.dto';
import { DatabaseSession } from 'src/core/database/database-session.interface';

@Injectable()
export abstract class ReferenceMonthRepository {
  abstract createMany(
    createReferenceMonth: CreateReferenceMonthDto[],
    session?: DatabaseSession,
  ): Promise<ResponseReferenceMonthDto[]>;

  abstract findByCostCenterId(
    costCenterId: number,
    session?: DatabaseSession,
  ): Promise<ResponseReferenceMonthDto[]>;

  abstract findById(
    id: number,
    session?: DatabaseSession,
  ): Promise<ResponseReferenceMonthDto>;

  abstract update(
    referenceMonthId: number,
    updateReferenceMonth: UpdateReferenceMonthDto,
    session?: DatabaseSession,
  ): Promise<ResponseReferenceMonthDto>;

  abstract delete(refMonthId: number, session?: DatabaseSession): Promise<void>;
}
