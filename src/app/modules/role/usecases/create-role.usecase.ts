import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RoleRepository } from 'src/app/repositories/role.repository';
import { ResponseRoleDto } from '../dto/response-role.dto';

@Injectable()
export class CreateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(data: CreateRoleDto): Promise<ResponseRoleDto> {
    return await this.roleRepository.create({
      title: data.title,
      description: data?.description,
      canCreate: data.canCreate,
      canRead: data.canRead,
      canEdit: data.canEdit,
      canRemove: data.canRemove,
    });
  }
}
