import dotenv from 'dotenv';
import { execaCommandSync } from 'execa';
import { createConnection } from 'mysql2/promise';

// .env.testを読み込む
dotenv.config({ path: '.env.test', override: true });

export default async function globalSetup() {
  console.log('🚀 Global setup: テスト用DBをセットアップ中...');

  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
  };

  const dbName = process.env.DB_DATABASE || 'superbetter_test';

  try {
    // MySQL接続
    const connection = await createConnection(dbConfig);

    // テスト用DBを作成（既に存在する場合はスキップ）
    console.log(`📦 Creating database: ${dbName}`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await connection.end();

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
    const connection2 = await createConnection({
      ...dbConfig,
      database: dbName,
    });
    await connection2.query('DELETE FROM user');
    await connection2.end();

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
  }
}
