import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const persons = pgTable('persons', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  createdAt: timestamp('created_at').defaultNow(),
});
