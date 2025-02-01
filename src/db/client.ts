import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2/promise';
import * as authScehma from './schema/auth';
import * as sbSchema from './schema/superbetter';

const schema = { ...authScehma, ...sbSchema };

const client = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  ssl: process.env.DB_TYPE?.toLowerCase() === 'tidb' ? {} : undefined,
});

const drizzleClient = drizzle(client, { schema, mode: 'default' });

const db = globalThis._db || drizzleClient;

declare global {
  var _db: typeof drizzleClient | undefined;
}

if (process.env.NODE_ENV !== 'production') {
  globalThis._db = db;
}

export { db };
