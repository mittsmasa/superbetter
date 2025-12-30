import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getDaysAgo, getToday } from '@/test/helpers/date-helpers';
import { createTestQuest, getTestUser } from '@/test/helpers/db-helpers';
import { getDailyMission } from '@/test/helpers/mission-helpers';

// getUser()をモック（トップレベルで実行）
vi.mock('@/app/(private)/_actions/get-user', () => ({
  getUser: vi.fn(),
}));

// next/headersをモック
vi.mock('next/headers', () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}));

// next/cacheをモック
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

import { getUser } from './get-user';
import { postQuestHistoryAtDate } from './post-quest-history-at-date';

describe('postQuestHistoryAtDate', () => {
  let testUserId: string;
  let testQuestId: string;

  beforeEach(async () => {
    // テストユーザーを取得
    const testUser = await getTestUser();
    testUserId = testUser.id;

    // getUser()のモックを設定
    vi.mocked(getUser).mockResolvedValue({ id: testUserId });

    // テスト用Questを作成
    testQuestId = await createTestQuest(testUserId, 'テストクエスト');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('今日の日付でQuestHistoryを作成し、Daily Missionが自動作成される', async () => {
    const today = getToday();

    const result = await postQuestHistoryAtDate(testQuestId, today);

    expect(result.type).toBe('ok');

    // ミッションが自動作成されたか確認
    const mission = await getDailyMission(testUserId, today);
    expect(mission).toBeDefined();
    expect(mission?.type).toBe('system-daily');

    // quest条件が1件completedになっているか確認
    const questConditions = mission?.missionConditions.filter(
      (c) => c.itemType === 'quest' && c.completed,
    );
    expect(questConditions).toHaveLength(1);
  });

  it('3日前の日付ではエラーが返る（編集不可）', async () => {
    const threeDaysAgo = getDaysAgo(3);

    const result = await postQuestHistoryAtDate(testQuestId, threeDaysAgo);

    expect(result.type).toBe('error');
    if (result.type === 'error') {
      expect(result.error.type).toBe('forbidden');
    }
  });

  it('昨日の日付でQuestHistoryを作成できる', async () => {
    const yesterday = getDaysAgo(1);

    const result = await postQuestHistoryAtDate(testQuestId, yesterday);

    expect(result.type).toBe('ok');

    // 昨日のミッションが作成されたか確認
    const mission = await getDailyMission(testUserId, yesterday);
    expect(mission).toBeDefined();
  });
});
