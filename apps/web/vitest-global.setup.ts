import dotenv from 'dotenv';
import { execaCommandSync } from 'execa';
import type { Connection } from 'mysql2/promise';
import { createConnection } from 'mysql2/promise';

// .env.testを読み込む
dotenv.config({ path: '.env.test', override: true });

/**
 * DB名のバリデーション（SQLインジェクション対策）
 */
function validateDbName(name: string): string {
  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    throw new Error(
      `Invalid database name: ${name}. Only alphanumeric and underscore allowed.`,
    );
  }
  return name;
}

export default async function globalSetup() {
  console.log('🚀 Global setup: テスト用DBをセットアップ中...');

  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
  };

  const dbName = validateDbName(process.env.DB_DATABASE || 'superbetter_test');

  let connection: Connection | null = null;
  let connection2: Connection | null = null;

  try {
    // MySQL接続
    connection = await createConnection(dbConfig);

    // テスト用DBを作成（既に存在する場合はスキップ）
    console.log(`📦 Creating database: ${dbName}`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);

    // マイグレーション実行
    console.log('🔄 Running migrations...');
    execaCommandSync('pnpm drizzle-kit migrate', {
      stdio: 'inherit',
      env: {
        ...process.env,
        DB_DATABASE: dbName,
      },
    });

    // ユーザーテーブルをクリアしてからシード実行
    console.log('🗑️  Clearing user table...');
    connection2 = await createConnection({
      ...dbConfig,
      database: dbName,
    });
    await connection2.query('DELETE FROM user');

    // シード実行
    console.log('🌱 Running seeds...');
    execaCommandSync('pnpm dlx tsx ./src/db/seed/index.ts', {
      stdio: 'inherit',
      env: {
        ...process.env,
        DB_DATABASE: dbName,
      },
    });

    console.log('✅ Global setup: Complete!');
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    // コネクションを確実にクローズ
    await connection?.end();
    await connection2?.end();
  }
}
