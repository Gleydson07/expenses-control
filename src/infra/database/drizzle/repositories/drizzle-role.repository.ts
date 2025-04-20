import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/app/repositories/role.repository';
import { DrizzleService } from '../drizzle.service';
import { roles } from 'drizzle/schema.drizzle';
import { eq } from 'drizzle-orm';
import { CreateRoleDto } from 'src/app/modules/role/dto/create-role.dto';
import { ResponseRoleDto } from 'src/app/modules/role/dto/response-role.dto';
import { UpdateRoleDto } from 'src/app/modules/role/dto/update-role.dto';

@Injectable()
export class DrizzleRoleRepository implements RoleRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(createRole: CreateRoleDto): Promise<ResponseRoleDto> {
    const data = await this.drizzleService.db
      .insert(roles)
      .values(createRole)
      .returning()
      .then((res) => res[0]);

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      canCreate: data.canCreate,
      canEdit: data.canEdit,
      canRead: data.canRead,
      canRemove: data.canRemove,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async findAll(): Promise<ResponseRoleDto[]> {
    const data = await this.drizzleService.db
      .select({
        id: roles.id,
        title: roles.title,
        description: roles.description,
        canCreate: roles.canCreate,
        canEdit: roles.canEdit,
        canRead: roles.canRead,
        canRemove: roles.canRemove,
        createdAt: roles.createdAt,
        updatedAt: roles.updatedAt,
      })
      .from(roles);

    return data.map((dt) => ({
      id: dt.id,
      title: dt.title,
      description: dt.description,
      canCreate: dt.canCreate,
      canEdit: dt.canEdit,
      canRead: dt.canRead,
      canRemove: dt.canRemove,
      createdAt: dt.createdAt,
      updatedAt: dt.updatedAt,
    }));
  }

  async findOne(roleId: number): Promise<ResponseRoleDto> {
    const data = await this.drizzleService.db
      .select({
        id: roles.id,
        title: roles.title,
        description: roles.description,
        canCreate: roles.canCreate,
        canEdit: roles.canEdit,
        canRead: roles.canRead,
        canRemove: roles.canRemove,
        createdAt: roles.createdAt,
        updatedAt: roles.updatedAt,
      })
      .from(roles)
      .where(eq(roles.id, roleId))
      .then((res) => res[0]);

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      canCreate: data.canCreate,
      canEdit: data.canEdit,
      canRead: data.canRead,
      canRemove: data.canRemove,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async findOneByTitle(title: string): Promise<ResponseRoleDto> {
    const data = await this.drizzleService.db.query.roles.findFirst({
      where: eq(this.drizzleService.schema.roles.title, title),
    });

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      canCreate: data.canCreate,
      canEdit: data.canEdit,
      canRead: data.canRead,
      canRemove: data.canRemove,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async update(
    roleId: number,
    updateRole: UpdateRoleDto,
  ): Promise<ResponseRoleDto> {
    const data = await this.drizzleService.db
      .update(roles)
      .set(updateRole)
      .where(eq(roles.id, roleId))
      .returning()
      .then((res) => res[0]);

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      canCreate: data.canCreate,
      canEdit: data.canEdit,
      canRead: data.canRead,
      canRemove: data.canRemove,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async remove(roleId: number): Promise<void> {
    await this.drizzleService.db.delete(roles).where(eq(roles.id, roleId));
  }
}
