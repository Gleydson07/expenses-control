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
} from 'drizzle-orm/pg-core';

export const plannedTransactionTypeEnum = pgEnum('planned_transaction_type', [
  'INCOME',
  'EXPENSE',
]);

export const referenceMonthStatusesEnum = pgEnum('reference_months_status', [
  'OPEN',
  'IN_PROGRESS',
  'COMPLETED',
  'CLOSED',
]);

export const transactionStatusEnum = pgEnum('transaction_status', [
  'PENDING',
  'SCHEDULED',
  'PAID',
  'PARTIALLY_PAID',
  'OVERDUE',
  'CANCELLED',
]);

export const roles = pgTable(
  'roles',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 128 }).unique(),
    description: varchar('description', { length: 2048 }),
    canCreate: boolean('can_create'),
    canEdit: boolean('can_edit'),
    canRead: boolean('can_read'),
    canRemove: boolean('can_remove'),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
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
  title: varchar('title', { length: 128 }).unique(),
  description: varchar('description', { length: 2048 }),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const costCenters = pgTable('cost_centers', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 128 }).unique(),
  description: varchar('description', { length: 2048 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
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

export const plannedTransactions = pgTable('planned_transactions', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id')
    .references(() => categories.id)
    .notNull(),
  title: varchar('title', { length: 128 }),
  description: varchar('description', { length: 2048 }),
  type: plannedTransactionTypeEnum('type').notNull(),
  estimatedValue: decimal('estimated_value', {
    precision: 9,
    scale: 2,
  }).default('0'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const referenceMonths = pgTable('reference_months', {
  id: serial('id').primaryKey(),
  costCenterId: integer('cost_center_id')
    .references(() => costCenters.id)
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
  month: timestamp('month'),
  year: timestamp('year'),
  notes: varchar('notes'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  referenceMonthId: integer('reference_month_id')
    .references(() => referenceMonths.id)
    .notNull(),
  plannedTransactionId: integer('planned_transaction_id')
    .references(() => transactions.id)
    .notNull(),
  status: transactionStatusEnum('status').notNull(),
  value: decimal('value', { precision: 9, scale: 2 }).default('0'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});
