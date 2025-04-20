import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle.service';
import { managements } from 'drizzle/schema.drizzle';
import { and, eq } from 'drizzle-orm';
import { ManagementRepository } from 'src/app/repositories/management.repository';
import { CreateManagementDto } from 'src/app/modules/management/dto/create-cost-center.dto';
import { ResponseManagementDto } from 'src/app/modules/management/dto/response-cost-center.dto';

@Injectable()
export class DrizzleManagementRepository implements ManagementRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(
    createManagement: CreateManagementDto,
  ): Promise<ResponseManagementDto> {
    const data = await this.drizzleService.db
      .insert(managements)
      .values(createManagement)
      .returning()
      .then((res) => res[0]);

    return {
      costCenterId: data.costCenterId,
      userId: data.userId,
      roleId: data.roleId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async findByCostCenterId(
    costCenterId: number,
  ): Promise<ResponseManagementDto[]> {
    const data = await this.drizzleService.db
      .select({
        costCenterId: managements.costCenterId,
        userId: managements.userId,
        roleId: managements.roleId,
        createdAt: managements.createdAt,
        updatedAt: managements.updatedAt,
      })
      .from(managements)
      .where(eq(managements.costCenterId, costCenterId))
      .execute();

    return data.map((dt) => ({
      costCenterId: dt.costCenterId,
      userId: dt.userId,
      roleId: dt.roleId,
      createdAt: dt.createdAt,
      updatedAt: dt.updatedAt,
    }));
  }

  async findByUserId(userId: number): Promise<ResponseManagementDto[]> {
    const data = await this.drizzleService.db
      .select({
        costCenterId: managements.costCenterId,
        userId: managements.userId,
        roleId: managements.roleId,
        createdAt: managements.createdAt,
        updatedAt: managements.updatedAt,
      })
      .from(managements)
      .where(eq(managements.userId, userId))
      .execute();

    return data.map((dt) => ({
      costCenterId: dt.costCenterId,
      userId: dt.userId,
      roleId: dt.roleId,
      createdAt: dt.createdAt,
      updatedAt: dt.updatedAt,
    }));
  }

  async delete(
    costCenterId: number,
    userId: number,
    roleId: number,
  ): Promise<void> {
    await this.drizzleService.db
      .delete(managements)
      .where(
        and(
          eq(managements.costCenterId, costCenterId),
          eq(managements.userId, userId),
          eq(managements.roleId, roleId),
        ),
      )
      .execute();
  }
}
