import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../modules/category/dto/create-category.dto';
import { ResponseCategoryDto } from '../modules/category/dto/response-category.dto';
import { UpdateCategoryDto } from '../modules/category/dto/update-category.dto';

@Injectable()
export abstract class CategoryRepository {
  abstract create(
    createCategory: CreateCategoryDto,
  ): Promise<ResponseCategoryDto>;

  abstract findAll(): Promise<ResponseCategoryDto[]>;

  abstract findOne(categoryId: number): Promise<ResponseCategoryDto>;

  abstract update(
    categoryId: number,
    updateCategory: UpdateCategoryDto,
  ): Promise<ResponseCategoryDto>;

  abstract remove(categoryId: number): Promise<void>;
}
