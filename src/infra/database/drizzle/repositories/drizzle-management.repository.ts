import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle.service';
import { managements } from 'drizzle/schema.drizzle';
import { and, eq, inArray } from 'drizzle-orm';
import { ManagementRepository } from 'src/app/repositories/management.repository';
import { CreateManagementDto } from 'src/app/modules/management/dto/create-cost-center.dto';
import { ResponseManagementDto } from 'src/app/modules/management/dto/response-cost-center.dto';

@Injectable()
export class DrizzleManagementRepository implements ManagementRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(
    createManagement: CreateManagementDto,
  ): Promise<ResponseManagementDto> {
    const { costCenterId, roleId, userId } = createManagement;

    const management = await this.drizzleService.db
      .insert(managements)
      .values({ costCenterId, roleId, userId })
      .returning();

    return management[0];
  }

  async findByCostCenterIds(
    costCenterIds: number[],
  ): Promise<ResponseManagementDto[]> {
    return await this.drizzleService.db
      .select({
        costCenterId: managements.costCenterId,
        userId: managements.userId,
        roleId: managements.roleId,
        createdAt: managements.createdAt,
        updatedAt: managements.updatedAt,
      })
      .from(managements)
      .where(inArray(managements.costCenterId, costCenterIds));
  }
}
