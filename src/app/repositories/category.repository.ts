import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../modules/category/dto/create-category.dto';
import { ResponseCategoryDto } from '../modules/category/dto/response-category.dto';
import { UpdateCategoryDto } from '../modules/category/dto/update-category.dto';
import { DatabaseSession } from 'src/core/database/database-session.interface';

@Injectable()
export abstract class CategoryRepository {
  abstract create(
    createCategory: CreateCategoryDto,
    session?: DatabaseSession,
  ): Promise<ResponseCategoryDto>;

  abstract findAll(session?: DatabaseSession): Promise<ResponseCategoryDto[]>;

  abstract findOne(
    categoryId: number,
    session?: DatabaseSession,
  ): Promise<ResponseCategoryDto>;

  abstract update(
    categoryId: number,
    updateCategory: UpdateCategoryDto,
    session?: DatabaseSession,
  ): Promise<ResponseCategoryDto>;

  abstract remove(categoryId: number, session?: DatabaseSession): Promise<void>;
}
