import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { DrizzleRoleRepository } from 'src/infra/database/drizzle/repositories/drizzle-role.repository';
import { RoleRepository } from 'src/app/repositories/role.repository';
import { CreateRoleUseCase } from './usecases/create-role.usecase';
import { FindByIdRoleUseCase } from './usecases/find-by-id-role.usecase';
import { UpdateRoleUseCase } from './usecases/update-role.usecase';
import { DeleteRoleUseCase } from './usecases/delete-role.usecase';
import { FindAllRolesUseCase } from './usecases/find-all-roles.usecase';

@Module({
  controllers: [RoleController],
  providers: [
    CreateRoleUseCase,
    FindByIdRoleUseCase,
    FindAllRolesUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    {
      provide: RoleRepository,
      useClass: DrizzleRoleRepository,
    },
  ],
})
export class RoleModule {}
