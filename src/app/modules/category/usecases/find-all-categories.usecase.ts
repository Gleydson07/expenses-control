import { Injectable } from '@nestjs/common';
import { ResponseCategoryDto } from '../dto/response-category.dto';
import { CategoryRepository } from 'src/app/repositories/category.repository';

@Injectable()
export class FindAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<ResponseCategoryDto[]> {
    return await this.categoryRepository.findAll();
  }
}
