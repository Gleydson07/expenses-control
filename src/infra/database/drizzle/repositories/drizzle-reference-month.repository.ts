import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle.service';
import { eq } from 'drizzle-orm';
import { ReferenceMonthRepository } from 'src/app/repositories/reference-month.repository';
import { CreateReferenceMonthDto } from 'src/app/modules/reference_month/dto/create-reference-month.dto';
import { ResponseReferenceMonthDto } from 'src/app/modules/reference_month/dto/response-reference-month.dto';
import { referenceMonths } from 'drizzle/schema.drizzle';
import { referenceMonthStatusesEnum } from 'src/app/modules/reference_month/dto/reference-month-status.enum';
import { UpdateReferenceMonthDto } from 'src/app/modules/reference_month/dto/update-reference-month.dto';

@Injectable()
export class DrizzleReferenceMonthRepository
  implements ReferenceMonthRepository
{
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(
    createReferenceMonth: CreateReferenceMonthDto,
  ): Promise<ResponseReferenceMonthDto> {
    const referenceMonth = await this.drizzleService.db
      .insert(referenceMonths)
      .values({
        ...createReferenceMonth,
        status: referenceMonthStatusesEnum.PLANNING,
      })
      .returning();

    return {
      id: referenceMonth[0].id,
      costCenterId: referenceMonth[0].costCenterId,
      month: referenceMonth[0].month,
      year: referenceMonth[0].year,
      notes: referenceMonth[0].notes,
      status: referenceMonth[0].status as referenceMonthStatusesEnum,
      expensesTotalValue: Number(referenceMonth[0].expensesTotalValue),
      incomesTotalValue: Number(referenceMonth[0].incomesTotalValue),
      balance: Number(referenceMonth[0].balance),
      createdAt: referenceMonth[0].createdAt,
      updatedAt: referenceMonth[0].updatedAt,
    };
  }

  async findByCostCenterId(
    costCenterId: number,
  ): Promise<ResponseReferenceMonthDto[]> {
    const refMonths = await this.drizzleService.db
      .select({
        id: referenceMonths.id,
        costCenterId: referenceMonths.costCenterId,
        month: referenceMonths.month,
        year: referenceMonths.year,
        notes: referenceMonths.notes,
        status: referenceMonths.status,
        expensesTotalValue: referenceMonths.expensesTotalValue,
        incomesTotalValue: referenceMonths.incomesTotalValue,
        balance: referenceMonths.balance,
        createdAt: referenceMonths.createdAt,
        updatedAt: referenceMonths.updatedAt,
      })
      .from(referenceMonths)
      .where(eq(referenceMonths.costCenterId, costCenterId))
      .execute();

    return refMonths.map((refMonth) => ({
      id: refMonth.id,
      costCenterId: refMonth.costCenterId,
      month: refMonth.month,
      year: refMonth.year,
      notes: refMonth.notes,
      status: refMonth.status as referenceMonthStatusesEnum,
      expensesTotalValue: Number(refMonth.expensesTotalValue),
      incomesTotalValue: Number(refMonth.incomesTotalValue),
      balance: Number(refMonth.balance),
      createdAt: refMonth.createdAt,
      updatedAt: refMonth.updatedAt,
    }));
  }

  async findById(referenceMonthId: number): Promise<ResponseReferenceMonthDto> {
    const refMonths = await this.drizzleService.db
      .select({
        id: referenceMonths.id,
        costCenterId: referenceMonths.costCenterId,
        month: referenceMonths.month,
        year: referenceMonths.year,
        notes: referenceMonths.notes,
        status: referenceMonths.status,
        expensesTotalValue: referenceMonths.expensesTotalValue,
        incomesTotalValue: referenceMonths.incomesTotalValue,
        balance: referenceMonths.balance,
        createdAt: referenceMonths.createdAt,
        updatedAt: referenceMonths.updatedAt,
      })
      .from(referenceMonths)
      .where(eq(referenceMonths.id, referenceMonthId))
      .execute();

    return {
      id: refMonths[0].id,
      costCenterId: refMonths[0].costCenterId,
      month: refMonths[0].month,
      year: refMonths[0].year,
      notes: refMonths[0].notes,
      status: refMonths[0].status as referenceMonthStatusesEnum,
      expensesTotalValue: Number(refMonths[0].expensesTotalValue),
      incomesTotalValue: Number(refMonths[0].incomesTotalValue),
      balance: Number(refMonths[0].balance),
      createdAt: refMonths[0].createdAt,
      updatedAt: refMonths[0].updatedAt,
    };
  }

  async update(
    referenceMonthId: number,
    updateReferenceMonth: UpdateReferenceMonthDto,
  ): Promise<ResponseReferenceMonthDto> {
    const refMonth = await this.drizzleService.db
      .update(referenceMonths)
      .set({
        ...updateReferenceMonth,
      })
      .where(eq(referenceMonths.id, referenceMonthId))
      .returning();

    return {
      id: refMonth[0].id,
      costCenterId: refMonth[0].costCenterId,
      month: refMonth[0].month,
      year: refMonth[0].year,
      notes: refMonth[0].notes,
      status: refMonth[0].status as referenceMonthStatusesEnum,
      expensesTotalValue: Number(refMonth[0].expensesTotalValue),
      incomesTotalValue: Number(refMonth[0].incomesTotalValue),
      balance: Number(refMonth[0].balance),
      createdAt: refMonth[0].createdAt,
      updatedAt: refMonth[0].updatedAt,
    };
  }

  async delete(refMonthId: number): Promise<void> {
    await this.drizzleService.db
      .delete(referenceMonths)
      .where(eq(referenceMonths.id, refMonthId))
      .execute();
  }
}
