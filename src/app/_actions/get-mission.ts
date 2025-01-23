'use server';

import { getUser } from '@/app/_actions/get-user';
import type { Result } from '@/app/_actions/types/result';
import { eq } from 'drizzle-orm';
import { db } from '../../../db/client';
import type { missions } from '../../../db/schema/superbetter';

export const getMissions = async (): Promise<
  Result<(typeof missions.$inferSelect)[], { type: 'unknown'; message: string }>
> => {
  const user = await getUser();
  try {
    const missions = await db.query.missions.findMany({
      where: (mission) => eq(mission.userId, user.id),
    });
    return { type: 'ok', data: missions };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};

export const getMission = async (
  missionId: string,
): Promise<
  Result<
    typeof missions.$inferSelect,
    { type: 'not-found' | 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  try {
    const mission = await db.query.missions.findFirst({
      where: (mission) => eq(mission.id, missionId),
    });

    if (!mission) {
      return {
        type: 'error',
        error: { type: 'not-found', message: 'specific id not found.' },
      };
    }
    return { type: 'ok', data: mission };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
