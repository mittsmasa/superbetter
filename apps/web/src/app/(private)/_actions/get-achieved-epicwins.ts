'use server';

import { and, desc, eq, isNotNull } from 'drizzle-orm';
import { db } from '@/db/client';
import { epicwinHistories, epicwins } from '@/db/schema/superbetter';
import { getUser } from './get-user';
import type { AchievedEpicWin, AchievementError } from './types/achievements';
import type { Result } from './types/result';

export const getAchievedEpicWins = async (): Promise<
  Result<AchievedEpicWin[], AchievementError>
> => {
  const user = await getUser();

  try {
    // archived = trueは「達成済み」を表す
    // Epic Winは一度達成されると自動的にarchivedになる
    const completedEpicWinsList = await db
      .select({
        id: epicwins.id,
        title: epicwins.title,
        description: epicwins.description,
        achievedAt: epicwinHistories.createdAt,
      })
      .from(epicwins)
      .innerJoin(epicwinHistories, eq(epicwins.id, epicwinHistories.epicwinId))
      .where(
        and(
          eq(epicwins.userId, user.id),
          eq(epicwins.archived, true), // 達成済みのEpic Winsのみ
          isNotNull(epicwinHistories.createdAt),
        ),
      )
      .orderBy(desc(epicwinHistories.createdAt)); // 最新の達成から表示

    return { type: 'ok', data: completedEpicWinsList };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown database error';
    console.error('Failed to fetch achieved Epic Wins:', {
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
          message: 'Failed to fetch achieved Epic Wins',
          cause: errorMessage,
        },
      };
    }

    return {
      type: 'error',
      error: {
        type: 'unknown',
        message: 'Unexpected error while fetching Epic Wins',
      },
    };
  }
};
