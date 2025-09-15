import { addDays } from 'date-fns';
import { describe, expect, vi } from 'vitest';
import { getDateString } from '@/app/_utils/date';
import { buildDailyAchievements } from '@/app/(private)/_actions/_utils/achievement-helpers';
import { test } from '../../../../test/utils/test-fixtures';

// DBクライアントをモック
vi.mock('@/db/client', async () => {
  return {
    db: undefined, // 各テストで設定
  };
});

describe('buildDailyAchievements', () => {
  test.concurrent(
    '基本的なデイリーアチーブメントの構築をテストする',
    async ({ testDb, testUser, seedData: _seedData }) => {
      // テスト用DBクライアントを設定
      vi.mocked(await import('@/db/client')).db = testDb.db;
      // vi.mocked(await import('@/db/client')).db = testDb.db as any;
      const baseDate = new Date('2025-01-01');
      const toDate = addDays(baseDate, 6); // 7日間
      const dayCount = 7;
      const now = addDays(baseDate, 3);

      const result = await buildDailyAchievements(
        testUser.id,
        baseDate,
        toDate,
        dayCount,
        now,
      );

      // 基本的な構造をテスト
      expect(result).toHaveLength(7);
      expect(result[0].date).toEqual(baseDate);
      expect(result[0].dateString).toBe('2025/1/1');

      // adventureLogsが正しく含まれているかテスト
      const day1 = result[0]; // PowerUp履歴あり
      expect(day1.adventureLogs).toHaveLength(2);
      expect(day1.adventureLogs[0].type).toBe('powerup');
      expect(day1.adventureLogs[0].title).toContain('テストパワーアップ1');

      const day2 = result[1]; // PowerUp、Villain履歴あり
      expect(day2.adventureLogs).toHaveLength(2);
      expect(day2.adventureLogs[0].type).toBe('powerup'); // ソート順確認
      expect(day2.adventureLogs[1].type).toBe('villain');
    },
  );

  test.concurrent(
    'ミッション完了状況を正しく判定する',
    async ({ testDb, testUser, seedData }) => {
      // テスト用DBクライアントを設定
      vi.mocked(await import('@/db/client')).db = testDb.db;
      const baseDate = new Date('2025-01-01');
      const toDate = addDays(baseDate, 2);
      const dayCount = 3;
      const now = addDays(baseDate, 1);

      const result = await buildDailyAchievements(
        testUser.id,
        baseDate,
        toDate,
        dayCount,
        now,
      );

      // ミッションがある日はstatusが設定される
      const missionDay = result.find((day) =>
        seedData.missions.some(
          (m) => getDateString(m.deadline) === day.dateString,
        ),
      );

      expect(missionDay).toBeDefined();
      expect(missionDay?.status).toBe('achieved'); // completed: trueの条件

      // ミッションがない日はno-data
      const noMissionDay = result.find(
        (day) =>
          !seedData.missions.some(
            (m) => getDateString(m.deadline) === day.dateString,
          ),
      );
      expect(noMissionDay?.status).toBe('no-data');
    },
  );

  test.concurrent(
    '引数が異なる場合の動作を確認する',
    async ({ testDb, testUser, seedData: _seedData }) => {
      // テスト用DBクライアントを設定
      vi.mocked(await import('@/db/client')).db = testDb.db;
      const baseDate = new Date('2025-01-01');
      const toDate = addDays(baseDate, 13); // 14日間
      const dayCount = 14;
      const now = addDays(baseDate, 7);

      const result = await buildDailyAchievements(
        testUser.id,
        baseDate,
        toDate,
        dayCount,
        now,
      );

      // 14日間のデータが生成される
      expect(result).toHaveLength(14);

      // 各日の基本構造をテスト
      result.forEach((day, index) => {
        expect(day.date).toEqual(addDays(baseDate, index));
        expect(day.dateString).toMatch(/^\d{4}\/\d{1,2}\/\d{1,2}$/); // 日本フォーマット
        expect(day.adventureLogs).toBeInstanceOf(Array);
        expect(['no-data', 'achieved', 'not-achieved']).toContain(day.status);
      });

      // 今日フラグのテスト
      const todayIndex = 7; // now = addDays(baseDate, 7)

      // 他の日はisTodayが未定義またはfalse
      result.forEach((day, index) => {
        if (index !== todayIndex) {
          expect(day.isToday).toBeFalsy();
        }
      });
    },
  );

  test.concurrent(
    '空のデータでも正常に動作する',
    async ({
      testDb,
      testUser,
      // seedDataを使わない = 空のデータ状態
    }) => {
      // テスト用DBクライアントを設定
      vi.mocked(await import('@/db/client')).db = testDb.db;
      const baseDate = new Date('2025-01-01');
      const toDate = addDays(baseDate, 2);
      const dayCount = 3;
      const now = baseDate;

      const result = await buildDailyAchievements(
        testUser.id,
        baseDate,
        toDate,
        dayCount,
        now,
      );

      // 基本構造は維持される
      expect(result).toHaveLength(3);

      // すべての日でadventureLogsが空配列
      result.forEach((day) => {
        expect(day.adventureLogs).toEqual([]);
        expect(day.status).toBe('no-data');
        expect(day.posNegScore).toBeUndefined();
      });
    },
  );
});
