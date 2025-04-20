import { Injectable } from '@nestjs/common';
import { CostCenterRepository } from 'src/app/repositories/cost-center.repository';
import { DrizzleService, Transaction } from '../drizzle.service';
import { CreateCostCenterDto } from 'src/app/modules/cost_center/dto/create-cost-center.dto';
import { ResponseCostCenterDto } from 'src/app/modules/cost_center/dto/response-cost-center.dto';
import { costCenters, managements } from 'drizzle/schema.drizzle';
import { UpdateCostCenterDto } from 'src/app/modules/cost_center/dto/update-cost-center.dto';
import { and, eq } from 'drizzle-orm';
import { create } from 'domain';

@Injectable()
export class DrizzleCostCenterRepository implements CostCenterRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(
    userId: number,
    createCostCenter: CreateCostCenterDto,
    tx?: Transaction,
  ): Promise<ResponseCostCenterDto> {
    const params = {
      ...createCostCenter,
      ownerUserId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const data = await (tx ? tx : this.drizzleService.db)
      .insert(costCenters)
      .values(params)
      .returning()
      .then((res) => res[0]);

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      ownerUserId: data.ownerUserId,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async findAll(
    userId: number,
    isActive?: boolean,
    tx?: Transaction,
  ): Promise<ResponseCostCenterDto[]> {
    const whereClause =
      isActive !== undefined
        ? and(
            eq(managements.userId, userId),
            eq(costCenters.isActive, isActive),
          )
        : eq(managements.userId, userId);

    const data = await (tx ? tx : this.drizzleService.db)
      .select({
        id: costCenters.id,
        title: costCenters.title,
        description: costCenters.description,
        ownerUserId: costCenters.ownerUserId,
        isActive: costCenters.isActive,
        createdAt: costCenters.createdAt,
        updatedAt: costCenters.updatedAt,
      })
      .from(costCenters)
      .innerJoin(managements, eq(costCenters.id, managements.costCenterId))
      .where(whereClause);

    return data.map((dt) => ({
      id: dt.id,
      title: dt.title,
      description: dt.description,
      ownerUserId: dt.ownerUserId,
      isActive: dt.isActive,
      createdAt: dt.createdAt,
      updatedAt: dt.updatedAt,
    }));
  }

  async findOne(
    centerCostId: number,
    userId: number,
    tx?: Transaction,
  ): Promise<ResponseCostCenterDto> {
    const data = await (tx ? tx : this.drizzleService.db)
      .select({
        id: costCenters.id,
        title: costCenters.title,
        description: costCenters.description,
        ownerUserId: costCenters.ownerUserId,
        isActive: costCenters.isActive,
        createdAt: costCenters.createdAt,
        updatedAt: costCenters.updatedAt,
      })
      .from(costCenters)
      .innerJoin(managements, eq(costCenters.id, managements.costCenterId))
      .where(
        and(eq(managements.userId, userId), eq(costCenters.id, centerCostId)),
      )
      .then((res) => res[0]);

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      ownerUserId: data.ownerUserId,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async update(
    centerCostId: number,
    updateCostCenter: UpdateCostCenterDto,
    tx?: Transaction,
  ): Promise<ResponseCostCenterDto> {
    const params = {
      ...updateCostCenter,
      updatedAt: new Date(),
    };

    const data = await (tx ? tx : this.drizzleService.db)
      .update(costCenters)
      .set(params)
      .where(eq(costCenters.id, centerCostId))
      .returning()
      .then((res) => res[0]);

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      ownerUserId: data.ownerUserId,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async remove(centerCostId: number, tx?: Transaction): Promise<void> {
    await (tx ? tx : this.drizzleService.db)
      .delete(costCenters)
      .where(eq(costCenters.id, centerCostId));
  }
}
