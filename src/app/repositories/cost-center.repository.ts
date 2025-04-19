import { Injectable } from '@nestjs/common';
import { CreateCostCenterDto } from '../modules/cost_center/dto/create-cost-center.dto';
import { ResponseCostCenterDto } from '../modules/cost_center/dto/response-cost-center.dto';
import { UpdateCostCenterDto } from '../modules/cost_center/dto/update-cost-center.dto';

@Injectable()
export abstract class CostCenterRepository {
  abstract create(
    userId: number,
    createCostCenter: CreateCostCenterDto,
  ): Promise<ResponseCostCenterDto>;

  abstract findAll(userId: number): Promise<ResponseCostCenterDto[]>;

  abstract findOne(
    userId: number,
    addressId: number,
  ): Promise<ResponseCostCenterDto>;

  abstract update(
    userId: number,
    addressId: number,
    updateCostCenter: UpdateCostCenterDto,
  ): Promise<ResponseCostCenterDto>;

  abstract remove(userId: number, addressId: number): Promise<void>;
}
