import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });
await migrate(drizzle(migrationClient), { migrationsFolder: './drizzle' });
console.log('migration complete');
