import { Injectable } from '@nestjs/common';
import { CreateManagementDto } from '../modules/management/dto/create-cost-center.dto';
import { ResponseManagementDto } from '../modules/management/dto/response-cost-center.dto';
import { DatabaseSession } from 'src/core/database/database-session.interface';

@Injectable()
export abstract class ManagementRepository {
  abstract create(
    createManagement: CreateManagementDto,
    session?: DatabaseSession,
  ): Promise<ResponseManagementDto>;

  abstract findByCostCenterId(
    costCenterId: number,
    session?: DatabaseSession,
  ): Promise<ResponseManagementDto[]>;

  abstract findByUserId(
    userId: number,
    session?: DatabaseSession,
  ): Promise<ResponseManagementDto[]>;

  abstract delete(
    costCenterId: number,
    userId: number,
    roleId?: number,
    session?: DatabaseSession,
  ): Promise<void>;
}
