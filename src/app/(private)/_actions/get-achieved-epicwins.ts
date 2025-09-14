'use server';

import { and, desc, eq, isNotNull } from 'drizzle-orm';
import { db } from '@/db/client';
import { epicwinHistories, epicwins } from '@/db/schema/superbetter';
import { getUser } from './get-user';
import type { Result } from './types/result';

export type AchievedEpicWin = {
  id: string;
  title: string;
  description: string | null;
  achievedAt: Date;
};

export const getAchievedEpicWins = async (): Promise<
  Result<AchievedEpicWin[], { type: 'unknown'; message: string }>
> => {
  const user = await getUser();

  try {
    const achievedEpicWins = await db
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
          eq(epicwins.archived, true),
          isNotNull(epicwinHistories.createdAt),
        ),
      )
      .orderBy(desc(epicwinHistories.createdAt));

    return { type: 'ok', data: achievedEpicWins };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
