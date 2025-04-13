// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './drizzle/schema.drizzle.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5002,
    user: 'developer',
    password: 'devpass',
    database: 'db_expenses_control',
  },
});
