import { Controller, Post, Body } from '@nestjs/common';
import { CreateCostCenterDto } from './dto/create-cost-center.dto';
import { CreateCostCenterUseCase } from './usecases/create-cost-center.usecase';
import { UserFromToken } from 'src/infra/auth/dto/token-payload.dto';
import { User } from 'src/infra/auth/decorators/user-extract-auth.decorator';

@Controller()
export class CostCenterController {
  constructor(
    private readonly createCostCenterUseCase: CreateCostCenterUseCase,
  ) {}

  @Post()
  create(
    @Body() createCostCenterDto: CreateCostCenterDto,
    @User() user: UserFromToken,
  ) {
    return this.createCostCenterUseCase.execute(user.sub, createCostCenterDto);
  }

  // @Get()
  // findAll() {
  //   return this.costCenterService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.costCenterService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCostCenterDto: UpdateCostCenterDto,
  // ) {
  //   return this.costCenterService.update(+id, updateCostCenterDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.costCenterService.remove(+id);
  // }
}
