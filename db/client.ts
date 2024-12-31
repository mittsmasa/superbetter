import 'dotenv/config';
import { connect as tidbConnect } from '@tidbcloud/serverless';
import { drizzle as mysql } from 'drizzle-orm/mysql2';
import { drizzle as tidb } from 'drizzle-orm/tidb-serverless';
import { createConnection as mysqlConnect } from 'mysql2/promise';

const createDrizzle = async () => {
  if (process.env.DB_TYPE?.toLowerCase() === 'tidb') {
    const client = tidbConnect({
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    return tidb({ client });
  }
  const client = await mysqlConnect({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  return mysql({ client });
};

export const db = await createDrizzle();
