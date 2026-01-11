'use server';

import { and, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { villainHistories, villains } from '@/db/schema/superbetter';
import { updateMissionConditions } from '@/utils/sql/mission';

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
        transaction: tx,
        userId: user.id,
        itemType: 'villain',
        itemId: villainId,
      });
      return historyId;
    });
    if (!historyId) {
      return {
        type: 'error',
        error: { type: 'unknown', message: 'unknown error' },
      };
    }
    revalidatePath(`/villains/${villainId}`);
    return { type: 'ok', data: { id: historyId } };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
