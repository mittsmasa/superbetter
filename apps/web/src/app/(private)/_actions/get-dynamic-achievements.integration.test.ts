import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getDaysAgo, getToday } from '@/test/helpers/date-helpers';
import {
  cleanupTestEntities,
  createTestPowerup,
  createTestPowerupHistory,
  createTestQuest,
  createTestQuestHistory,
  getTestUser,
} from '@/test/helpers/db-helpers';
import { getDateString } from '@/utils/date';

// server-onlyをモック
vi.mock('server-only', () => ({}));

// getUser()をモック
vi.mock('@/app/(private)/_actions/get-user', () => ({
  getUser: vi.fn(),
}));

import { getDynamicAchievements } from './get-dynamic-achievements';
import { getUser } from './get-user';

describe('getDynamicAchievements', () => {
  let testUserId: string;

  beforeEach(async () => {
    const testUser = await getTestUser();
    testUserId = testUser.id;

    // getUser()のモックを設定
    vi.mocked(getUser).mockResolvedValue({ id: testUserId });

    // テスト前にクリーンアップ
    await cleanupTestEntities(testUserId);
  });

  afterEach(async () => {
    await cleanupTestEntities(testUserId);
    vi.restoreAllMocks();
  });

  it('履歴がない場合、1週間分のデータを返す（periodDays=7）', async () => {
    const result = await getDynamicAchievements();

    expect(result.type).toBe('ok');
    if (result.type === 'ok') {
      expect(result.data.periodDays).toBe(7);
      expect(result.data.data.length).toBe(7);
    }
  });

  it('3日前から履歴がある場合、適切な期間を返す', async () => {
    const threeDaysAgo = getDaysAgo(3);
    const powerupId = await createTestPowerup(testUserId);
    await createTestPowerupHistory(powerupId, threeDaysAgo);

    const result = await getDynamicAchievements();

    expect(result.type).toBe('ok');
    if (result.type === 'ok') {
      // 3日前から今日まで = 4日間
      expect(result.data.periodDays).toBe(4);
      expect(result.data.data.length).toBe(4);
    }
  });

  it('10日前から履歴がある場合、10日分のデータを返す', async () => {
    const tenDaysAgo = getDaysAgo(10);
    const questId = await createTestQuest(testUserId);
    await createTestQuestHistory(questId, tenDaysAgo);

    const result = await getDynamicAchievements();

    expect(result.type).toBe('ok');
    if (result.type === 'ok') {
      // 10日前から今日まで = 11日間
      expect(result.data.periodDays).toBe(11);
      expect(result.data.data.length).toBe(11);
    }
  });

  it('30日前から履歴がある場合、30日分のデータを返す', async () => {
    const thirtyDaysAgo = getDaysAgo(30);
    const powerupId = await createTestPowerup(testUserId);
    await createTestPowerupHistory(powerupId, thirtyDaysAgo);

    const result = await getDynamicAchievements();

    expect(result.type).toBe('ok');
    if (result.type === 'ok') {
      // 30日前から今日まで = 31日間
      expect(result.data.periodDays).toBe(31);
      expect(result.data.data.length).toBe(31);
    }
  });

  it('履歴のある日のadventureLogsには履歴が含まれる', async () => {
    const threeDaysAgo = getDaysAgo(3);
    const powerupId = await createTestPowerup(testUserId);
    await createTestPowerupHistory(powerupId, threeDaysAgo);

    const result = await getDynamicAchievements();

    expect(result.type).toBe('ok');
    if (result.type === 'ok') {
      // 履歴がある日のデータを検証
      const dayWithHistory = result.data.data.find((d) => {
        const date = new Date(d.dateString);
        return date.toDateString() === threeDaysAgo.toDateString();
      });
      expect(dayWithHistory).toBeDefined();
      // adventureLogsに履歴が含まれている
      expect(dayWithHistory?.adventureLogs.length).toBeGreaterThan(0);
      expect(dayWithHistory?.adventureLogs[0].type).toBe('powerup');
    }
  });

  it('最後のデータは今日の日付である', async () => {
    const threeDaysAgo = getDaysAgo(3);
    const powerupId = await createTestPowerup(testUserId);
    await createTestPowerupHistory(powerupId, threeDaysAgo);

    const result = await getDynamicAchievements();

    expect(result.type).toBe('ok');
    if (result.type === 'ok') {
      const todayData = result.data.data[result.data.data.length - 1];
      const todayString = getDateString(getToday());
      expect(todayData?.dateString).toBe(todayString);
    }
  });

  it('データは日付順（古い順）にソートされている', async () => {
    const fiveDaysAgo = getDaysAgo(5);
    const powerupId = await createTestPowerup(testUserId);
    await createTestPowerupHistory(powerupId, fiveDaysAgo);

    const result = await getDynamicAchievements();

    expect(result.type).toBe('ok');
    if (result.type === 'ok') {
      const dates = result.data.data.map((d) =>
        new Date(d.dateString).getTime(),
      );
      for (let i = 1; i < dates.length; i++) {
        expect(dates[i]).toBeGreaterThan(dates[i - 1]);
      }
    }
  });
});
