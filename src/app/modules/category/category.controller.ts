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
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryUseCase } from './usecases/create-category.usecase';
import { FindByIdCategoryUseCase } from './usecases/find-by-id-category.usecase';
import { DeleteCategoryUseCase } from './usecases/delete-category.usecase';
import { FindAllCategoriesUseCase } from './usecases/find-all-categories.usecase';
import { UpdateCategoryUseCase } from './usecases/update-category.usecase';

@Controller()
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findByIdCategoryUseCase: FindByIdCategoryUseCase,
    private readonly findAllCategoriesUseCase: FindAllCategoriesUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  @Post()
  create(@Body() createCategory: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(createCategory);
  }

  @Get()
  findAll() {
    return this.findAllCategoriesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdCategoryUseCase.execute(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategory: UpdateCategoryDto) {
    return this.updateCategoryUseCase.execute(+id, updateCategory);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCategoryUseCase.execute(+id);
  }
}
