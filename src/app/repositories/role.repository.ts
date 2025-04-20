import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../modules/role/dto/create-role.dto';
import { ResponseRoleDto } from '../modules/role/dto/response-role.dto';
import { UpdateRoleDto } from '../modules/role/dto/update-role.dto';

@Injectable()
export abstract class RoleRepository {
  abstract create(createRole: CreateRoleDto): Promise<ResponseRoleDto>;

  abstract findAll(): Promise<ResponseRoleDto[]>;

  abstract findOne(roleId: number): Promise<ResponseRoleDto>;

  abstract findOneByTitle(title: string): Promise<ResponseRoleDto>;

  abstract update(
    roleId: number,
    updateRole: UpdateRoleDto,
  ): Promise<ResponseRoleDto>;

  abstract remove(roleId: number): Promise<void>;
}
