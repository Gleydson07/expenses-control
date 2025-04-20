import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/app/repositories/role.repository';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ResponseRoleDto } from '../dto/response-role.dto';

@Injectable()
export class UpdateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(roleId: number, data: UpdateRoleDto): Promise<ResponseRoleDto> {
    return await this.roleRepository.update(roleId, data);
  }
}
