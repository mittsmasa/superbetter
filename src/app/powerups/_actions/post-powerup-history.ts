'use server';

import { getUser } from '@/app/_actions/get-user';
import type { Result } from '@/app/_actions/types/result';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '../../../../db/client';
import { powerupHistories, powerups } from '../../../../db/schema/superbetter';

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
      const [{ id: historyId }] = await db
        .insert(powerupHistories)
        .values({ powerupId: pup.id })
        .$returningId();
      await db
        .update(powerups)
        .set({ count: sql`${powerups.count} + 1` })
        .where(eq(powerups.id, pup.id));
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
