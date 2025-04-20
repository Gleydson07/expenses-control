import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/app/repositories/role.repository';
import { ResponseRoleDto } from '../dto/response-role.dto';

@Injectable()
export class FindByIdRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(roleId: number): Promise<ResponseRoleDto> {
    return await this.roleRepository.findOne(roleId);
  }
}
