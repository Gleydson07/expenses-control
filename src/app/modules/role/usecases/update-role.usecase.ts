import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/app/repositories/role.repository';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ResponseRoleDto } from '../dto/response-role.dto';

@Injectable()
export class UpdateRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(
    costControlId: number,
    data: UpdateRoleDto,
  ): Promise<ResponseRoleDto> {
    const costCenter = await this.roleRepository.update(costControlId, data);

    return costCenter;
  }
}
