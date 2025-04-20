import { Injectable } from '@nestjs/common';
import { ResponseRoleDto } from '../dto/response-role.dto';
import { RoleRepository } from 'src/app/repositories/role.repository';

@Injectable()
export class FindAllRolesUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(): Promise<ResponseRoleDto[]> {
    return await this.roleRepository.findAll();
  }
}
