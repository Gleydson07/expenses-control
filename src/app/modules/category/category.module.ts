import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { DrizzleCategoryRepository } from 'src/infra/database/drizzle/repositories/drizzle-category.repository';
import { CategoryRepository } from 'src/app/repositories/category.repository';
import { CreateCategoryUseCase } from './usecases/create-category.usecase';
import { FindByIdCategoryUseCase } from './usecases/find-by-id-category.usecase';
import { UpdateCategoryUseCase } from './usecases/update-category.usecase';
import { DeleteCategoryUseCase } from './usecases/delete-category.usecase';
import { FindAllCategoriesUseCase } from './usecases/find-all-categories.usecase';

@Module({
  controllers: [CategoryController],
  providers: [
    CreateCategoryUseCase,
    FindByIdCategoryUseCase,
    FindAllCategoriesUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    {
      provide: CategoryRepository,
      useClass: DrizzleCategoryRepository,
    },
  ],
  exports: [CategoryRepository],
})
export class CategoryModule {}
