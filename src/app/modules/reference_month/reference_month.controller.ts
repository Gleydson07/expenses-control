import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateReferenceMonthsUseCase } from './usecases/create-reference-months.usecase';
import { ResponseReferenceMonthDto } from './dto/response-reference-month.dto';
import { CreateReferenceMonthsUseCaseDto } from './dto/create-reference-months.usecase.dto';
import { UpdateStatusReferenceMonthUseCaseDto } from './dto/update-status-reference-month.dto';
import { UpdateStatusReferenceMonthUseCase } from './usecases/update-reference-month.usecase';

@Controller()
export class ReferenceMonthController {
  constructor(
    private readonly createReferenceMonthsUseCase: CreateReferenceMonthsUseCase,
    private readonly updateReferenceMonthUseCase: UpdateStatusReferenceMonthUseCase,
  ) {}

  @Post()
  async createAnnualReferenceMonths(
    data: CreateReferenceMonthsUseCaseDto,
  ): Promise<ResponseReferenceMonthDto[]> {
    return await this.createReferenceMonthsUseCase.execute(data);
  }

  @Post(':id')
  async updateReferenceMonth(
    @Param('id') id: string,
    @Body() data: UpdateStatusReferenceMonthUseCaseDto,
  ): Promise<ResponseReferenceMonthDto> {
    return await this.updateReferenceMonthUseCase.execute(+id, data);
  }
}
