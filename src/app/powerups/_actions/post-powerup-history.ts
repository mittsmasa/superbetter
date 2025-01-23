'use server';

import { getUser } from '@/app/_actions/get-user';
import type { Result } from '@/app/_actions/types/result';
import { and, eq, gt, inArray, or, sql } from 'drizzle-orm';
import { db } from '../../../../db/client';
import {
  missionConditions,
  missions,
  powerupHistories,
  powerups,
} from '../../../../db/schema/superbetter';

export const postPowerupHistory = async (
  powerupId: string,
): Promise<Result<{ id: string }, { type: 'unknown'; message: string }>> => {
  const user = await getUser();

  try {
    const historyId = await db.transaction(async (tx) => {
      const pup = await tx.query.powerups.findFirst({
        where: (powerup) =>
          and(eq(powerup.id, powerupId), eq(powerup.userId, user.id)),
      });
      if (!pup) {
        tx.rollback();
        return;
      }
      const [{ id: historyId }] = await tx
        .insert(powerupHistories)
        .values({ powerupId: pup.id })
        .$returningId();
      await tx
        .update(powerups)
        .set({ count: sql`${powerups.count} + 1` })
        .where(eq(powerups.id, pup.id));

      // update mission condition
      // TODO: move to another function
      const tragetMissons = await tx
        .select()
        .from(missions)
        .where(
          and(
            gt(missions.deadline, new Date()),
            eq(missions.userId, user.id),
            eq(missionConditions.itemType, 'powerup'),
            or(
              eq(missionConditions.conditionType, 'any'),
              and(
                eq(missionConditions.conditionType, 'specific'),
                eq(missionConditions.itemId, powerupId),
              ),
            ),
          ),
        )
        .innerJoin(
          missionConditions,
          eq(missions.id, missionConditions.missionId),
        );

      await tx
        .update(missionConditions)
        .set({ completed: true })
        .where(
          inArray(
            missionConditions.id,
            tragetMissons.map((m) => m.missionCondition.id),
          ),
        );
      return historyId;
    });
    if (!historyId) {
      return {
        type: 'error',
        error: { type: 'unknown', message: 'unknown error' },
      };
    }
    return { type: 'ok', data: { id: historyId } };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
