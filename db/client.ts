import 'dotenv/config';
import { connect as tidbConnect } from '@tidbcloud/serverless';
import { drizzle as mysql } from 'drizzle-orm/mysql2';
import { drizzle as tidb } from 'drizzle-orm/tidb-serverless';
import { createConnection as mysqlConnect } from 'mysql2/promise';
import * as authScehma from './schema/auth';
import * as sbSchema from './schema/superbetter';

const schema = { ...authScehma, ...sbSchema };

const createDrizzle = async () => {
  if (process.env.DB_TYPE?.toLowerCase() === 'tidb') {
    const client = tidbConnect({
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    return tidb({ client, schema });
  }
  const client = await mysqlConnect({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  return mysql(client, { schema, mode: 'default' });
};

export const db = await createDrizzle();
