import 'dotenv/config';
import { drizzle as mysql } from 'drizzle-orm/mysql2';
import { createConnection as mysqlConnect } from 'mysql2/promise';
import * as authScehma from './schema/auth';
import * as sbSchema from './schema/superbetter';

const schema = { ...authScehma, ...sbSchema };

const createDrizzle = async () => {
  const client = await mysqlConnect({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: process.env.DB_TYPE?.toLowerCase() === 'tidb' ? {} : undefined,
  });
  return mysql(client, { schema, mode: 'default' });
};

export const db = await createDrizzle();
