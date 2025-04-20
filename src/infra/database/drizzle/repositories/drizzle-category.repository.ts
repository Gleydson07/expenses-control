import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/app/repositories/category.repository';
import { DrizzleService } from '../drizzle.service';
import { categories } from 'drizzle/schema.drizzle';
import { eq } from 'drizzle-orm';
import { CreateCategoryDto } from 'src/app/modules/category/dto/create-category.dto';
import { ResponseCategoryDto } from 'src/app/modules/category/dto/response-category.dto';
import { UpdateCategoryDto } from 'src/app/modules/category/dto/update-category.dto';

@Injectable()
export class DrizzleCategoryRepository implements CategoryRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(
    createCategory: CreateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    const data = await this.drizzleService.db
      .insert(categories)
      .values(createCategory)
      .returning()
      .then((res) => res[0]);

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async findAll(): Promise<ResponseCategoryDto[]> {
    const data = await this.drizzleService.db
      .select({
        id: categories.id,
        title: categories.title,
        description: categories.description,
        createdAt: categories.createdAt,
        updatedAt: categories.updatedAt,
      })
      .from(categories);

    return data.map((dt) => ({
      id: dt.id,
      title: dt.title,
      description: dt.description,
      createdAt: dt.createdAt,
      updatedAt: dt.updatedAt,
    }));
  }

  async findOne(categoryId: number): Promise<ResponseCategoryDto> {
    const data = await this.drizzleService.db
      .select({
        id: categories.id,
        title: categories.title,
        description: categories.description,
        createdAt: categories.createdAt,
        updatedAt: categories.updatedAt,
      })
      .from(categories)
      .where(eq(categories.id, categoryId))
      .then((res) => res[0]);

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async update(
    categoryId: number,
    updateCategory: UpdateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    const data = await this.drizzleService.db
      .update(categories)
      .set(updateCategory)
      .where(eq(categories.id, categoryId))
      .returning()
      .then((res) => res[0]);

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async remove(categoryId: number): Promise<void> {
    await this.drizzleService.db
      .delete(categories)
      .where(eq(categories.id, categoryId));
  }
}
