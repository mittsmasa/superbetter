'use server';

import { getUser } from '@/app/_actions/get-user';
import type { Result } from '@/app/_actions/types/result';
import { and, desc, eq, gt } from 'drizzle-orm';
import { db } from '../../../db/client';
import { missionConditions, missions } from '../../../db/schema/superbetter';

export const getMissions = async (): Promise<
  Result<
    (typeof missions.$inferSelect & {
      missionConditions: (typeof missionConditions.$inferSelect)[];
    })[],
    { type: 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  try {
    const rows = await db
      .select()
      .from(missions)
      .where(
        and(eq(missions.userId, user.id), gt(missions.deadline, new Date())),
      )
      .innerJoin(
        missionConditions,
        eq(missions.id, missionConditions.missionId),
      )
      .orderBy(desc(missionConditions.itemType));

    const data = Object.values(
      rows.reduce<
        Record<
          string,
          typeof missions.$inferSelect & {
            missionConditions: (typeof missionConditions.$inferSelect)[];
          }
        >
      >((acc, row) => {
        const mission = row.mission;
        const missionCondition = row.missionCondition;

        if (!acc[mission.id]) {
          acc[mission.id] = {
            ...mission,
            missionConditions: [],
          };
        }
        acc[mission.id].missionConditions.push(missionCondition);
        return acc;
      }, {}),
    );

    return { type: 'ok', data };
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
