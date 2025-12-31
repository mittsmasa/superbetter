import { beforeAll, beforeEach, vi } from 'vitest';
import { db } from '@/db/client';
import {
  epicwinHistories,
  epicwins,
  missionConditions,
  missions,
  powerupHistories,
  powerups,
  questHistories,
  quests,
  villainHistories,
  villains,
} from '@/db/schema/superbetter';

// .env.testを読み込み（src/db/client.tsより前に実行される必要がある）
// TZもここで設定される

// server-onlyパッケージをモック（テスト環境ではサーバーコンポーネントとして扱う）
vi.mock('server-only', () => ({}));

beforeAll(async () => {
  console.log('🧪 Integration test setup: starting...');

  try {
    // DB接続確認
    await db.execute('SELECT 1');
    console.log('✅ Database connection OK');
  } catch (error) {
    console.error('❌ Database connection failed', error);
    throw error;
  }
});

beforeEach(async () => {
  // 各テストケース前にデータをクリーンアップ
  // 外部キー制約を考慮した順序で削除
  await db.delete(questHistories);
  await db.delete(powerupHistories);
  await db.delete(villainHistories);
  await db.delete(epicwinHistories);

  await db.delete(missionConditions);
  await db.delete(missions);

  await db.delete(quests);
  await db.delete(powerups);
  await db.delete(villains);
  await db.delete(epicwins);
});
