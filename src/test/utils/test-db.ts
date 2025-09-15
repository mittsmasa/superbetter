import { MySqlContainer } from '@testcontainers/mysql';
import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { createPool } from 'mysql2/promise';
import { afterAll } from 'vitest';
import * as authSchema from '@/db/schema/auth';
import * as sbSchema from '@/db/schema/superbetter';

export const schema = { ...authSchema, ...sbSchema };

export async function createTestDatabase() {
  // MySQLコンテナを起動
  const container = await new MySqlContainer('mysql:8.0')
    .withDatabase('testdb')
    .withUsername('testuser')
    .withUserPassword('testpass')
    .withRootPassword('rootpass')
    .start();

  // データベース接続プールを作成
  const pool = createPool({
    host: container.getHost(),
    port: container.getPort(),
    user: container.getUsername(),
    password: container.getUserPassword(),
    database: container.getDatabase(),
    connectionLimit: 5,
    connectTimeout: 10000,
  });

  // Drizzleクライアントを作成
  const db = drizzle(pool, { schema, mode: 'default' });

  // マイグレーションを実行（testcontainers環境では相対パスを絶対パスに変更）
  const migrationsPath = `${process.cwd()}/src/db/drizzle`;
  await migrate(db, { migrationsFolder: migrationsPath });

  const close = async () => {
    await pool.end();
    await container.stop();
  };

  afterAll(async () => {
    await close();
  });
  return { db, close };
}
