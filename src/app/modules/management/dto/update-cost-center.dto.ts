import { PartialType } from '@nestjs/mapped-types';
import { CreateManagementDto } from './create-cost-center.dto';

export class UpdateManagementDto extends PartialType(CreateManagementDto) {}
