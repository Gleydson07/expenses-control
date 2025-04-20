import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/app/repositories/category.repository';
import { ResponseCategoryDto } from '../dto/response-category.dto';

@Injectable()
export class FindByIdCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(categoryId: number): Promise<ResponseCategoryDto> {
    return await this.categoryRepository.findOne(categoryId);
  }
}
