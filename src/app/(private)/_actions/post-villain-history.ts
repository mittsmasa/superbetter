'use server';

import { and, eq, sql } from 'drizzle-orm';
import { updateMissionConditions } from '@/app/_utils/sql/mission';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { villainHistories, villains } from '@/db/schema/superbetter';

export const postVillainHistory = async (
  villainId: string,
): Promise<Result<{ id: string }, { type: 'unknown'; message: string }>> => {
  const user = await getUser();

  try {
    const historyId = await db.transaction(async (tx) => {
      const vil = await tx.query.villains.findFirst({
        where: (villain) =>
          and(eq(villain.id, villainId), eq(villain.userId, user.id)),
      });
      if (!vil) {
        tx.rollback();
        return;
      }
      const [{ id: historyId }] = await tx
        .insert(villainHistories)
        .values({ villainId: vil.id })
        .$returningId();
      await tx
        .update(villains)
        .set({ count: sql`${villains.count} + 1` })
        .where(eq(villains.id, vil.id));

      // update mission condition
      await updateMissionConditions({
        itemId: villainId,
        itemType: 'villain',
        transaction: tx,
        userId: user.id,
      });
      return historyId;
    });
    if (!historyId) {
      return {
        error: { message: 'unknown error', type: 'unknown' },
        type: 'error',
      };
    }
    return { data: { id: historyId }, type: 'ok' };
  } catch (e) {
    console.error(e);
    return {
      error: { message: 'unknown error', type: 'unknown' },
      type: 'error',
    };
  }
};
