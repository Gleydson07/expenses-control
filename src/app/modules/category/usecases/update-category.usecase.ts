import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/app/repositories/category.repository';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ResponseCategoryDto } from '../dto/response-category.dto';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(
    categoryId: number,
    data: UpdateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    return await this.categoryRepository.update(categoryId, data);
  }
}
