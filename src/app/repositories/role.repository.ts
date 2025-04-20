import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../modules/role/dto/create-role.dto';
import { ResponseRoleDto } from '../modules/role/dto/response-role.dto';
import { UpdateRoleDto } from '../modules/role/dto/update-role.dto';
import { DatabaseSession } from 'src/core/database/database-session.interface';

@Injectable()
export abstract class RoleRepository {
  abstract create(
    createRole: CreateRoleDto,
    session?: DatabaseSession,
  ): Promise<ResponseRoleDto>;

  abstract findAll(session?: DatabaseSession): Promise<ResponseRoleDto[]>;

  abstract findOne(
    roleId: number,
    session?: DatabaseSession,
  ): Promise<ResponseRoleDto>;

  abstract findOneByTitle(
    title: string,
    session?: DatabaseSession,
  ): Promise<ResponseRoleDto>;

  abstract update(
    roleId: number,
    updateRole: UpdateRoleDto,
    session?: DatabaseSession,
  ): Promise<ResponseRoleDto>;

  abstract remove(roleId: number, session?: DatabaseSession): Promise<void>;
}
