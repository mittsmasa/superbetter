import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './db/drizzle',
  schema: './db/schema/*',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 0),
    user: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? 'root',
    database: process.env.DB_DATABASE ?? 'superbetter',
    ssl: process.env.DB_TYPE?.toLowerCase() === 'tidb' ? {} : undefined,
  },
});
