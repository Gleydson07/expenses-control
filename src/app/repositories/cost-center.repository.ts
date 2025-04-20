import { Injectable } from '@nestjs/common';
import { CreateCostCenterDto } from '../modules/cost_center/dto/create-cost-center.dto';
import { ResponseCostCenterDto } from '../modules/cost_center/dto/response-cost-center.dto';
import { UpdateCostCenterDto } from '../modules/cost_center/dto/update-cost-center.dto';
import { DatabaseSession } from 'src/core/database/database-session.interface';

@Injectable()
export abstract class CostCenterRepository {
  abstract create(
    userId: number,
    createCostCenter: CreateCostCenterDto,
    session?: DatabaseSession,
  ): Promise<ResponseCostCenterDto>;

  abstract findAll(
    userId: number,
    session?: DatabaseSession,
  ): Promise<ResponseCostCenterDto[]>;

  abstract findOne(
    centerCostId: number,
    userId: number,
    session?: DatabaseSession,
  ): Promise<ResponseCostCenterDto>;

  abstract update(
    centerCostId: number,
    updateCostCenter: UpdateCostCenterDto,
    session?: DatabaseSession,
  ): Promise<ResponseCostCenterDto>;

  abstract remove(
    centerCostId: number,
    session?: DatabaseSession,
  ): Promise<void>;
}
