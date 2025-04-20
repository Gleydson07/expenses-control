import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateCostCenterUseCase } from './usecases/create-cost-center.usecase';
import { UserFromToken } from 'src/infra/auth/dto/token-payload.dto';
import { User } from 'src/infra/auth/decorators/user-extract-auth.decorator';
import { FindByUserIdCostCenterUseCase } from './usecases/find-by-user-id-cost-center.usecase';
import { FindByIdCostCenterUseCase } from './usecases/find-by-id-cost-center.usecase';
import { UpdateCostCenterUseCase } from './usecases/update-cost-center.usecase';
import { UpdateCostCenterDto } from './dto/update-cost-center.dto';
import { DeleteCostCenterUseCase } from './usecases/delete-cost-center.usecase';
import { CreateCostCenterUseCaseDto } from './dto/create-cost-center.usecase.dto';

@Controller()
export class CostCenterController {
  constructor(
    private readonly createCostCenterUseCase: CreateCostCenterUseCase,
    private readonly findByUserIdCostCenterUseCase: FindByUserIdCostCenterUseCase,
    private readonly findByIdCostCenterUseCase: FindByIdCostCenterUseCase,
    private readonly updateCostCenterUseCase: UpdateCostCenterUseCase,
    private readonly deleteCostCenterUseCase: DeleteCostCenterUseCase,
  ) {}

  @Post()
  create(
    @Body() createCostCenter: CreateCostCenterUseCaseDto,
    @User() user: UserFromToken,
  ) {
    return this.createCostCenterUseCase.execute(user.sub, createCostCenter);
  }

  @Get()
  findAll(@User() user: UserFromToken) {
    return this.findByUserIdCostCenterUseCase.execute(user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserFromToken) {
    return this.findByIdCostCenterUseCase.execute(+id, +user.sub);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCostCenterDto: UpdateCostCenterDto,
  ) {
    return this.updateCostCenterUseCase.execute(+id, updateCostCenterDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCostCenterUseCase.execute(+id);
  }
}
