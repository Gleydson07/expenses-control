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
    const management = await this.drizzleService.db
      .insert(managements)
      .values(createManagement)
      .returning();

    return management[0];
  }

  async findByCostCenterId(
    costCenterId: number,
  ): Promise<ResponseManagementDto[]> {
    const manags = await this.drizzleService.db
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

    return manags.map((management) => ({
      costCenterId: management.costCenterId,
      userId: management.userId,
      roleId: management.roleId,
      createdAt: management.createdAt,
      updatedAt: management.updatedAt,
    }));
  }

  async findByUserId(userId: number): Promise<ResponseManagementDto[]> {
    const manags = await this.drizzleService.db
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

    return manags.map((management) => ({
      costCenterId: management.costCenterId,
      userId: management.userId,
      roleId: management.roleId,
      createdAt: management.createdAt,
      updatedAt: management.updatedAt,
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
