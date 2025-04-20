import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryRepository } from 'src/app/repositories/category.repository';
import { ResponseCategoryDto } from '../dto/response-category.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(data: CreateCategoryDto): Promise<ResponseCategoryDto> {
    return await this.categoryRepository.create({
      title: data.title,
      description: data?.description,
    });
  }
}
