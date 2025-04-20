export class ResponseRoleDto {
  id: number;
  title: string;
  description?: string;
  canCreate: boolean;
  canEdit: boolean;
  canRead: boolean;
  canRemove: boolean;
  createdAt: Date;
  updatedAt: Date;
}
