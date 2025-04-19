import { Injectable } from '@nestjs/common';
import { CostCenterRepository } from 'src/app/repositories/cost-center.repository';
import { DrizzleService } from '../drizzle.service';
import { CreateCostCenterDto } from 'src/app/modules/cost_center/dto/create-cost-center.dto';
import { ResponseCostCenterDto } from 'src/app/modules/cost_center/dto/response-cost-center.dto';
import { costCenters, managements } from 'drizzle/schema.drizzle';
import { UpdateCostCenterDto } from 'src/app/modules/cost_center/dto/update-cost-center.dto';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class DrizzleCostCenterRepository implements CostCenterRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(
    userId: number,
    createCostCenter: CreateCostCenterDto,
  ): Promise<ResponseCostCenterDto> {
    const { title, description } = createCostCenter;

    const costCenter = await this.drizzleService.db
      .insert(costCenters)
      .values({ title, description: description, userId })
      .returning();

    return costCenter[0];
  }

  async findAll(
    userId: number,
    isActive?: boolean,
  ): Promise<ResponseCostCenterDto[]> {
    const whereClause =
      isActive !== undefined
        ? and(
            eq(managements.userId, userId),
            eq(costCenters.isActive, isActive),
          )
        : eq(managements.userId, userId);

    const result = await this.drizzleService.db
      .select({
        id: costCenters.id,
        title: costCenters.title,
        description: costCenters.description,
        isActive: costCenters.isActive,
        createdAt: costCenters.createdAt,
        updatedAt: costCenters.updatedAt,
      })
      .from(costCenters)
      .innerJoin(managements, eq(costCenters.id, managements.costCenterId))
      .where(whereClause);

    return result;
  }

  findOne(userId: number, addressId: number): Promise<ResponseCostCenterDto> {
    throw new Error('Method not implemented.');
  }

  update(
    userId: number,
    addressId: number,
    updateCostCenter: UpdateCostCenterDto,
  ): Promise<ResponseCostCenterDto> {
    throw new Error('Method not implemented.');
  }

  remove(userId: number, addressId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
