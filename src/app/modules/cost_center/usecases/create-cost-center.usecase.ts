import { Injectable } from '@nestjs/common';
import { CostCenterRepository } from 'src/app/repositories/const-center.repository';
import { ResponseCostCenterDto } from '../dto/response-cost-center.dto';
import { CreateCostCenterDto } from '../dto/create-cost-center.dto';

@Injectable()
export class CreateCostCenterUseCase {
  constructor(private readonly costCenterRepository: CostCenterRepository) {}

  async execute(
    userId: number,
    data: CreateCostCenterDto,
  ): Promise<ResponseCostCenterDto> {
    return await this.costCenterRepository.create(userId, {
      title: data.title,
      description: data?.description,
    });
  }
}
