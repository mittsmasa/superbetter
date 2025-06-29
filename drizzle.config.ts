import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dbCredentials: {
    database: process.env.DB_DATABASE ?? 'superbetter',
    host: process.env.DB_HOST ?? 'localhost',
    password: process.env.DB_PASSWORD ?? 'root',
    port: Number(process.env.DB_PORT ?? 0),
    ssl: process.env.DB_TYPE?.toLowerCase() === 'tidb' ? {} : undefined,
    user: process.env.DB_USERNAME ?? 'root',
  },
  dialect: 'mysql',
  out: './src/db/drizzle',
  schema: './src/db/schema/*',
});
