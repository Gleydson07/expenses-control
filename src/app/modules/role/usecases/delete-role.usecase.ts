import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/app/repositories/role.repository';

@Injectable()
export class DeleteRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(roleId: number): Promise<void> {
    await this.roleRepository.remove(roleId);
  }
}
