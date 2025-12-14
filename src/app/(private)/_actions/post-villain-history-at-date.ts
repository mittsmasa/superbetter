'use server';

import { and, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { updateMissionConditions } from '@/app/_utils/sql/mission';
import { createNoonDate } from '@/app/(private)/_actions/_utils/create-noon-date';
import { isEditableDate } from '@/app/(private)/_actions/_utils/editable-date';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { villainHistories, villains } from '@/db/schema/superbetter';

export const postVillainHistoryAtDate = async (
  villainId: string,
  targetDate: Date,
): Promise<
  Result<{ id: string }, { type: 'forbidden' | 'unknown'; message: string }>
> => {
  const user = await getUser();

  if (!isEditableDate(targetDate)) {
    return {
      type: 'error',
      error: { type: 'forbidden', message: '今日と昨日のみ編集可能です' },
    };
  }

  try {
    const noonDate = createNoonDate(targetDate);

    const historyId = await db.transaction(async (tx) => {
      const vil = await tx.query.villains.findFirst({
        where: and(eq(villains.id, villainId), eq(villains.userId, user.id)),
      });
      if (!vil) {
        tx.rollback();
        return;
      }

      const [{ id: historyId }] = await tx
        .insert(villainHistories)
        .values({ villainId: vil.id, createdAt: noonDate })
        .$returningId();

      await tx
        .update(villains)
        .set({ count: sql`${villains.count} + 1` })
        .where(eq(villains.id, vil.id));

      await updateMissionConditions({
        transaction: tx,
        userId: user.id,
        itemType: 'villain',
        itemId: villainId,
        historyCreatedAt: noonDate,
      });

      return historyId;
    });

    if (!historyId) {
      return {
        type: 'error',
        error: { type: 'unknown', message: 'unknown error' },
      };
    }

    revalidatePath('/');
    revalidatePath(`/history/${targetDate.toISOString().split('T')[0]}`);
    return { type: 'ok', data: { id: historyId } };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
