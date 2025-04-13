import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  integer,
} from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 128 }),
  description: varchar('description', { length: 2048 }),
  canCreate: boolean('can_create'),
  canEdit: boolean('can_edit'),
  canRead: boolean('can_read'),
  canRemove: boolean('can_remove'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 128 }),
  description: varchar('description', { length: 2048 }),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const costCenters = pgTable('cost_centers', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 128 }),
  description: varchar('description', { length: 2048 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const managements = pgTable('managements', {
  id: serial('id').primaryKey(),
  costCenterId: integer('cost_center_id')
    .references(() => costCenters.id)
    .notNull(),
  roleId: integer('role_id')
    .references(() => roles.id)
    .notNull(),
  userId: integer('user_id').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});
