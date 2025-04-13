import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
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
