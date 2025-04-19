export class ResponseCostCenterDto {
  id: number;
  title: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ResponseCostCenterWithManagementsDto extends ResponseCostCenterDto {
  managements: {
    userId: number;
    roleId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
