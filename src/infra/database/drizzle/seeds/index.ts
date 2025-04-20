import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import 'dotenv/config';

import * as schema from '../../../../../drizzle/schema.drizzle';

async function main() {
  const { PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE } = process.env;

  if (!PG_USER || !PG_PASSWORD || !PG_HOST || !PG_PORT || !PG_DATABASE) {
    throw new Error('Variáveis do banco de dados não definidas.');
  }

  const connectionString = `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`;

  if (!connectionString) {
    throw new Error('DATABASE_URL não definida');
  }

  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client, { schema });

  const existingRole = await db.query.roles.findFirst({
    where: eq(schema.roles.title, 'Admin'),
  });

  if (!existingRole) {
    const admin = {
      title: 'Admin',
      description: 'Administrador geral',
      canCreate: true,
      canEdit: true,
      canRead: true,
      canRemove: true,
    };

    const [adminRole] = await db
      .insert(schema.roles)
      .values(admin)
      .returning({ id: schema.roles.id });

    console.log('Role admin criada:', adminRole.id);
  }

  await client.end(); // 👈 Fecha a conexão manualmente no final
}

main()
  .then(() => {
    console.log('Seed concluído com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Erro no seed:', error);
    process.exit(1);
  });
