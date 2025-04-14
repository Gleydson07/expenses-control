import { Injectable } from '@nestjs/common';
import { CreateManagementDto } from '../modules/management/dto/create-cost-center.dto';
import { ResponseManagementDto } from '../modules/management/dto/response-cost-center.dto';

@Injectable()
export abstract class ManagementRepository {
  abstract create(
    createManagement: CreateManagementDto,
  ): Promise<ResponseManagementDto>;

  abstract findAll(userId: number): Promise<ResponseManagementDto[]>;
}
