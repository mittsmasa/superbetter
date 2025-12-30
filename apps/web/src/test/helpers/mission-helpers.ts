import { and, between, eq } from 'drizzle-orm';
import { getStartAndEndOfDay } from '@/app/_utils/date';
import { db } from '@/db/client';
import { missionConditions, missions } from '@/db/schema/superbetter';

/**
 * 指定日付のデイリーミッションを取得
 */
export const getDailyMission = async (userId: string, targetDate: Date) => {
  const { start, end } = getStartAndEndOfDay(targetDate);

  // ミッションを取得
  const mission = await db
    .select()
    .from(missions)
    .where(
      and(
        eq(missions.userId, userId),
        eq(missions.type, 'system-daily'),
        between(missions.deadline, start, end),
      ),
    )
    .limit(1)
    .then((rows) => rows[0]);

  if (!mission) {
    return undefined;
  }

  // ミッション条件を取得
  const conditions = await db
    .select()
    .from(missionConditions)
    .where(eq(missionConditions.missionId, mission.id));

  return {
    ...mission,
    missionConditions: conditions,
  };
};

/**
 * ミッション条件の完了状態をアサート
 */
export const assertMissionConditionCompleted = (
  conditions: Array<{ completed: boolean }>,
  expectedCompletedCount: number,
) => {
  const completedCount = conditions.filter((c) => c.completed).length;

  if (completedCount !== expectedCompletedCount) {
    throw new Error(
      `Expected ${expectedCompletedCount} completed conditions, but got ${completedCount}`,
    );
  }
};
