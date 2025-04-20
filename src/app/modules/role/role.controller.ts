import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleUseCase } from './usecases/create-role.usecase';
import { FindByIdRoleUseCase } from './usecases/find-by-id-role.usecase';
import { UpdateRoleUseCase } from './usecases/update-role.usecase';
import { DeleteRoleUseCase } from './usecases/delete-role.usecase';
import { FindAllRolesUseCase } from './usecases/find-all-roles.usecase';

@Controller()
export class RoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly findByIdRoleUseCase: FindByIdRoleUseCase,
    private readonly findAllRolesUseCase: FindAllRolesUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
  ) {}

  @Post()
  create(@Body() createRole: CreateRoleDto) {
    const { title, description, canCreate, canEdit, canRead, canRemove } =
      createRole;

    const role = {
      title,
      description,
      canCreate: Boolean(canCreate),
      canEdit: Boolean(canEdit),
      canRead: Boolean(canRead),
      canRemove: Boolean(canRemove),
    };

    return this.createRoleUseCase.execute(role);
  }

  @Get()
  findAll() {
    return this.findAllRolesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdRoleUseCase.execute(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRole: UpdateRoleDto) {
    return this.updateRoleUseCase.execute(+id, updateRole);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteRoleUseCase.execute(+id);
  }
}
