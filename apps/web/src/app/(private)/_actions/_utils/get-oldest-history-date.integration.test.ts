import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getDaysAgo } from '@/test/helpers/date-helpers';
import {
  cleanupTestEntities,
  createTestEpicwin,
  createTestEpicwinHistory,
  createTestPowerup,
  createTestPowerupHistory,
  createTestQuest,
  createTestQuestHistory,
  createTestVillain,
  createTestVillainHistory,
  getTestUser,
} from '@/test/helpers/db-helpers';

// server-onlyをモック
vi.mock('server-only', () => ({}));

import { getOldestHistoryDate } from './get-oldest-history-date';

describe('getOldestHistoryDate', () => {
  let testUserId: string;

  beforeEach(async () => {
    const testUser = await getTestUser();
    testUserId = testUser.id;
    // テスト前にクリーンアップ
    await cleanupTestEntities(testUserId);
  });

  afterEach(async () => {
    // テスト後にクリーンアップ
    await cleanupTestEntities(testUserId);
    vi.restoreAllMocks();
  });

  it('履歴がない場合はnullを返す', async () => {
    const result = await getOldestHistoryDate(testUserId);

    expect(result).toBeNull();
  });

  it('PowerupHistoryのみがある場合、その日付を返す', async () => {
    const threeDaysAgo = getDaysAgo(3);
    const powerupId = await createTestPowerup(testUserId);
    await createTestPowerupHistory(powerupId, threeDaysAgo);

    const result = await getOldestHistoryDate(testUserId);

    expect(result).not.toBeNull();
    expect(result?.toDateString()).toBe(threeDaysAgo.toDateString());
  });

  it('QuestHistoryのみがある場合、その日付を返す', async () => {
    const fiveDaysAgo = getDaysAgo(5);
    const questId = await createTestQuest(testUserId);
    await createTestQuestHistory(questId, fiveDaysAgo);

    const result = await getOldestHistoryDate(testUserId);

    expect(result).not.toBeNull();
    expect(result?.toDateString()).toBe(fiveDaysAgo.toDateString());
  });

  it('VillainHistoryのみがある場合、その日付を返す', async () => {
    const twoDaysAgo = getDaysAgo(2);
    const villainId = await createTestVillain(testUserId);
    await createTestVillainHistory(villainId, twoDaysAgo);

    const result = await getOldestHistoryDate(testUserId);

    expect(result).not.toBeNull();
    expect(result?.toDateString()).toBe(twoDaysAgo.toDateString());
  });

  it('EpicwinHistoryのみがある場合、その日付を返す', async () => {
    const sevenDaysAgo = getDaysAgo(7);
    const epicwinId = await createTestEpicwin(testUserId);
    await createTestEpicwinHistory(epicwinId, sevenDaysAgo);

    const result = await getOldestHistoryDate(testUserId);

    expect(result).not.toBeNull();
    expect(result?.toDateString()).toBe(sevenDaysAgo.toDateString());
  });

  it('複数の履歴がある場合、最も古い日付を返す', async () => {
    const threeDaysAgo = getDaysAgo(3);
    const fiveDaysAgo = getDaysAgo(5);
    const tenDaysAgo = getDaysAgo(10);
    const twoDaysAgo = getDaysAgo(2);

    const powerupId = await createTestPowerup(testUserId);
    const questId = await createTestQuest(testUserId);
    const villainId = await createTestVillain(testUserId);
    const epicwinId = await createTestEpicwin(testUserId);

    await createTestPowerupHistory(powerupId, threeDaysAgo);
    await createTestQuestHistory(questId, fiveDaysAgo);
    await createTestVillainHistory(villainId, tenDaysAgo); // 最も古い
    await createTestEpicwinHistory(epicwinId, twoDaysAgo);

    const result = await getOldestHistoryDate(testUserId);

    expect(result).not.toBeNull();
    expect(result?.toDateString()).toBe(tenDaysAgo.toDateString());
  });

  it('同じエンティティに複数の履歴がある場合、最も古い日付を返す', async () => {
    const oneDayAgo = getDaysAgo(1);
    const fiveDaysAgo = getDaysAgo(5);
    const tenDaysAgo = getDaysAgo(10);

    const powerupId = await createTestPowerup(testUserId);
    await createTestPowerupHistory(powerupId, oneDayAgo);
    await createTestPowerupHistory(powerupId, fiveDaysAgo);
    await createTestPowerupHistory(powerupId, tenDaysAgo); // 最も古い

    const result = await getOldestHistoryDate(testUserId);

    expect(result).not.toBeNull();
    expect(result?.toDateString()).toBe(tenDaysAgo.toDateString());
  });
});
