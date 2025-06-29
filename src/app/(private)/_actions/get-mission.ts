import 'server-only';

import { and, desc, eq, gt } from 'drizzle-orm';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { missionConditions, missions } from '@/db/schema/superbetter';
import { createDailyMission } from './create-daily-mission';

export const getMissions = async (): Promise<
  Result<
    (typeof missions.$inferSelect & {
      missionConditions: (typeof missionConditions.$inferSelect)[];
    })[],
    { type: 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  await createDailyMission();
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

    return { data, type: 'ok' };
  } catch (e) {
    console.error(e);
    return {
      error: { message: 'unknown error', type: 'unknown' },
      type: 'error',
    };
  }
};

export const getMission = async (
  missionId: string,
): Promise<
  Result<
    typeof missions.$inferSelect & {
      missionConditions: (typeof missionConditions.$inferSelect)[];
    },
    { type: 'not-found' | 'unknown'; message: string }
  >
> => {
  const user = await getUser();
  try {
    const rows = await db
      .select()
      .from(missions)
      .where(and(eq(missions.id, missionId), eq(missions.userId, user.id)))
      .innerJoin(
        missionConditions,
        eq(missions.id, missionConditions.missionId),
      );

    if (rows.length === 0) {
      return {
        error: { message: 'missions not found', type: 'not-found' },
        type: 'error',
      };
    }

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
    ).at(0);

    if (!data) {
      return {
        error: { message: 'data not found', type: 'not-found' },
        type: 'error',
      };
    }
    return {
      data,
      type: 'ok',
    };
  } catch (e) {
    console.error(e);
    return {
      error: { message: 'unknown error', type: 'unknown' },
      type: 'error',
    };
  }
};
