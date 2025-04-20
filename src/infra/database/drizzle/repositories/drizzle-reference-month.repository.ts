import { Injectable } from '@nestjs/common';
import { DrizzleService, Transaction } from '../drizzle.service';
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

  async createMany(
    createReferenceMonths: CreateReferenceMonthDto[],
    tx?: Transaction,
  ): Promise<ResponseReferenceMonthDto[]> {
    const params = createReferenceMonths.map((refMonth) => ({
      ...refMonth,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const data = await (tx ? tx : this.drizzleService.db)
      .insert(referenceMonths)
      .values(params)
      .returning();

    return data.map((dt) => ({
      id: dt.id,
      costCenterId: dt.costCenterId,
      month: dt.month,
      year: dt.year,
      notes: dt.notes,
      status: dt.status as referenceMonthStatusesEnum,
      expensesTotalValue: Number(dt.expensesTotalValue),
      incomesTotalValue: Number(dt.incomesTotalValue),
      balance: Number(dt.balance),
      createdAt: dt.createdAt,
      updatedAt: dt.updatedAt,
    }));
  }

  async findByCostCenterId(
    costCenterId: number,
    tx?: Transaction,
  ): Promise<ResponseReferenceMonthDto[]> {
    const data = await (tx ? tx : this.drizzleService.db)
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

    return data.map((dt) => ({
      id: dt.id,
      costCenterId: dt.costCenterId,
      month: dt.month,
      year: dt.year,
      notes: dt.notes,
      status: dt.status as referenceMonthStatusesEnum,
      expensesTotalValue: Number(dt.expensesTotalValue),
      incomesTotalValue: Number(dt.incomesTotalValue),
      balance: Number(dt.balance),
      createdAt: dt.createdAt,
      updatedAt: dt.updatedAt,
    }));
  }

  async findById(
    referenceMonthId: number,
    tx?: Transaction,
  ): Promise<ResponseReferenceMonthDto> {
    const data = await (tx ? tx : this.drizzleService.db)
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
      .execute()
      .then((res) => res[0]);

    return {
      id: data.id,
      costCenterId: data.costCenterId,
      month: data.month,
      year: data.year,
      notes: data.notes,
      status: data.status as referenceMonthStatusesEnum,
      expensesTotalValue: Number(data.expensesTotalValue),
      incomesTotalValue: Number(data.incomesTotalValue),
      balance: Number(data.balance),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async update(
    referenceMonthId: number,
    updateReferenceMonth: UpdateReferenceMonthDto,
    tx?: Transaction,
  ): Promise<ResponseReferenceMonthDto> {
    const params = {
      ...updateReferenceMonth,
      updatedAt: new Date(),
    };

    const data = await (tx ? tx : this.drizzleService.db)
      .update(referenceMonths)
      .set(params)
      .where(eq(referenceMonths.id, referenceMonthId))
      .returning()
      .then((res) => res[0]);

    return {
      id: data.id,
      costCenterId: data.costCenterId,
      month: data.month,
      year: data.year,
      notes: data.notes,
      status: data.status as referenceMonthStatusesEnum,
      expensesTotalValue: Number(data.expensesTotalValue),
      incomesTotalValue: Number(data.incomesTotalValue),
      balance: Number(data.balance),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async delete(refMonthId: number, tx?: Transaction): Promise<void> {
    await (tx ? tx : this.drizzleService.db)
      .delete(referenceMonths)
      .where(eq(referenceMonths.id, refMonthId))
      .execute();
  }
}
