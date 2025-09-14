'use server';

import { subDays } from 'date-fns';
import { and, desc, eq, gte, lte, sql } from 'drizzle-orm';
import { fixToUTC, getDateString, getTZDate } from '@/app/_utils/date';
import { db } from '@/db/client';
import { missionConditions, missions } from '@/db/schema/superbetter';
import { getUser } from './get-user';
import type {
  AchievementError,
  DailyMissionStreakData,
} from './types/achievements';
import type { Result } from './types/result';

export const getDailyMissionStreak = async (): Promise<
  Result<DailyMissionStreakData, AchievementError>
> => {
  const user = await getUser();

  try {
    const currentDate = getTZDate(new Date());
    const lookbackStartDate = fixToUTC(subDays(currentDate, 30));
    const lookbackEndDate = fixToUTC(currentDate);

    // SQLで各日の完了状況を効率的に取得
    const dailyMissionCompletionResults = await db
      .select({
        missionDeadline: missions.deadline,
        totalConditions: sql<number>`count(${missionConditions.id})`.as(
          'total_conditions',
        ),
        completedConditions:
          sql<number>`sum(case when ${missionConditions.completed} = true then 1 else 0 end)`.as(
            'completed_conditions',
          ),
      })
      .from(missions)
      .innerJoin(
        missionConditions,
        eq(missions.id, missionConditions.missionId),
      )
      .where(
        and(
          eq(missions.userId, user.id),
          eq(missions.type, 'system-daily'),
          gte(missions.deadline, lookbackStartDate),
          lte(missions.deadline, lookbackEndDate),
        ),
      )
      .groupBy(missions.deadline)
      .orderBy(desc(missions.deadline));

    // 今日から過去に遡って連続達成日数を計算
    let currentStreakCount = 0;
    let checkingDate = currentDate;
    const maxDaysToCheck = 30;

    for (let dayOffset = 0; dayOffset < maxDaysToCheck; dayOffset++) {
      const dateStringToCheck = getDateString(checkingDate);

      // 該当日のミッション完了状況を検索
      const dayMissionResult = dailyMissionCompletionResults.find(
        (result) =>
          result.missionDeadline &&
          getDateString(result.missionDeadline) === dateStringToCheck,
      );

      if (!dayMissionResult) {
        // ミッションが存在しない日は連続記録を停止
        break;
      }

      // 全条件が完了しているかチェック
      const isDayCompleted =
        dayMissionResult.totalConditions ===
        dayMissionResult.completedConditions;

      if (isDayCompleted) {
        currentStreakCount++;
        checkingDate = subDays(checkingDate, 1);
      } else {
        // 未完了の日があれば連続記録を停止
        break;
      }
    }

    return { type: 'ok', data: { streak: currentStreakCount } };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown database error';
    console.error('Daily mission streak calculation failed:', {
      error: errorMessage,
      userId: user.id,
      timestamp: new Date().toISOString(),
    });

    // データベースエラーの判定
    if (
      error instanceof Error &&
      (error.message.includes('database') ||
        error.message.includes('connection') ||
        error.message.includes('query'))
    ) {
      return {
        type: 'error',
        error: {
          type: 'database',
          message: 'Failed to calculate mission streak',
          cause: errorMessage,
        },
      };
    }

    return {
      type: 'error',
      error: {
        type: 'unknown',
        message: 'Unexpected error during streak calculation',
      },
    };
  }
};
