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
    const { title, description, canCreate, canEdit, canRead, canRemove } =
      createRole;

    const role = await this.drizzleService.db
      .insert(roles)
      .values({
        title,
        description: description,
        canCreate,
        canEdit,
        canRead,
        canRemove,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return role[0];
  }

  async findAll(): Promise<ResponseRoleDto[]> {
    return await this.drizzleService.db
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
  }

  async findOne(roleId: number): Promise<ResponseRoleDto> {
    return await this.drizzleService.db
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
      .then((res) => {
        if (res.length === 0) return null;

        return res[0];
      });
  }

  async findOneByTitle(title: string): Promise<ResponseRoleDto> {
    return await this.drizzleService.db.query.roles.findFirst({
      where: eq(this.drizzleService.schema.roles.title, title),
    });
  }

  async update(
    roleId: number,
    updateRole: UpdateRoleDto,
  ): Promise<ResponseRoleDto> {
    const { title, description, canCreate, canEdit, canRead, canRemove } =
      updateRole;

    return this.drizzleService.db
      .update(roles)
      .set({
        title,
        description,
        canCreate,
        canEdit,
        canRead,
        canRemove,
        updatedAt: new Date(),
      })
      .where(eq(roles.id, roleId))
      .returning()
      .then((res) => res[0]);
  }

  async remove(roleId: number): Promise<void> {
    await this.drizzleService.db.delete(roles).where(eq(roles.id, roleId));

    return;
  }
}
