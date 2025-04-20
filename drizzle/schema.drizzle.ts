import { sql } from 'drizzle-orm';
import {
  pgTable,
  serial,
  varchar,
  boolean,
  decimal,
  timestamp,
  integer,
  pgEnum,
  primaryKey,
  unique,
  check,
} from 'drizzle-orm/pg-core';

export const financialPlanTypeEnum = pgEnum('financial_plan_type', [
  'INCOME',
  'EXPENSE',
]);

export const referenceMonthStatusesEnum = pgEnum('reference_months_status', [
  'PLANNING',
  'OPENED',
  'CLOSED',
]);

export const transactionStatusEnum = pgEnum('transaction_status', [
  'PLANNING',
  'SCHEDULED',
  'PAID',
]);

export const costCenters = pgTable(
  'cost_centers',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 128 }).notNull(),
    ownerUserId: integer('owner_user_id').notNull(),
    description: varchar('description', { length: 2048 }),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (costCenter) => [
    unique('un_cost_centers_title_owner_user_id').on(
      costCenter.title,
      costCenter.ownerUserId,
    ),
  ],
);

export const roles = pgTable(
  'roles',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 128 }).notNull().unique(),
    description: varchar('description', { length: 2048 }),
    canCreate: boolean('can_create').default(false),
    canEdit: boolean('can_edit').default(false),
    canRead: boolean('can_read').default(false),
    canRemove: boolean('can_remove').default(false),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (role) => [
    unique('un_roles_title_ccreate_cedit_cread_cremove').on(
      role.canCreate,
      role.canEdit,
      role.canRead,
      role.canRemove,
    ),
  ],
);

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 128 }).notNull().unique(),
  description: varchar('description', { length: 2048 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const managements = pgTable(
  'managements',
  {
    costCenterId: integer('cost_center_id')
      .references(() => costCenters.id, { onDelete: 'cascade' })
      .notNull(),
    roleId: integer('role_id')
      .references(() => roles.id)
      .notNull(),
    userId: integer('user_id').notNull(),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
  },
  (managements) => [
    primaryKey({
      columns: [
        managements.costCenterId,
        managements.roleId,
        managements.userId,
      ],
    }),
  ],
);

export const referenceMonths = pgTable(
  'reference_months',
  {
    id: serial('id').primaryKey(),
    costCenterId: integer('cost_center_id')
      .references(() => costCenters.id, { onDelete: 'cascade' })
      .notNull(),
    status: referenceMonthStatusesEnum('status').notNull(),
    expensesTotalValue: decimal('expenses_total_value', {
      precision: 12,
      scale: 2,
    }).default('0'),
    incomesTotalValue: decimal('incomes_total_value', {
      precision: 12,
      scale: 2,
    }).default('0'),
    balance: decimal('balance', { precision: 12, scale: 2 }).generatedAlwaysAs(
      'incomes_total_value - expenses_total_value',
    ),
    month: integer('month').notNull(),
    year: integer('year').notNull(),
    notes: varchar('notes', { length: 8000 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (referenceMonths) => [
    check('month_range_check', sql`month >= 1 AND month <= 12`),
    unique('un_reference_months_cost_center_id_month_year').on(
      referenceMonths.costCenterId,
      referenceMonths.month,
      referenceMonths.year,
    ),
  ],
);

export const financialPlans = pgTable('financial_plans', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id')
    .references(() => categories.id, { onDelete: 'restrict' })
    .notNull(),
  title: varchar('title', { length: 128 }).notNull().unique(),
  description: varchar('description', { length: 2048 }),
  type: financialPlanTypeEnum('type').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  referenceMonthId: integer('reference_month_id')
    .references(() => referenceMonths.id, { onDelete: 'cascade' })
    .notNull(),
  financialPlanId: integer('financial_plan_id')
    .references(() => financialPlans.id, { onDelete: 'cascade' })
    .notNull(),
  status: transactionStatusEnum('status').notNull(),
  estimatedValue: decimal('estimated_value', {
    precision: 9,
    scale: 2,
  }).default('0'),
  value: decimal('value', { precision: 9, scale: 2 }).default('0'),
  paymentDate: timestamp('payment_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
