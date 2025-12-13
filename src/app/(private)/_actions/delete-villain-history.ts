'use server';

import { and, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { isEditableDate } from '@/app/(private)/_actions/_utils/editable-date';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { villainHistories, villains } from '@/db/schema/superbetter';

export const deleteVillainHistory = async (
  historyId: string,
  targetDate: Date,
): Promise<
  Result<undefined, { type: 'forbidden' | 'unknown'; message: string }>
> => {
  const user = await getUser();

  if (!isEditableDate(targetDate)) {
    return {
      type: 'error',
      error: { type: 'forbidden', message: '今日と昨日のみ編集可能です' },
    };
  }

  try {
    await db.transaction(async (tx) => {
      const history = await tx.query.villainHistories.findFirst({
        where: eq(villainHistories.id, historyId),
      });
      if (!history) {
        tx.rollback();
        return;
      }

      const villain = await tx.query.villains.findFirst({
        where: and(
          eq(villains.id, history.villainId),
          eq(villains.userId, user.id),
        ),
      });
      if (!villain) {
        tx.rollback();
        return;
      }

      await tx
        .delete(villainHistories)
        .where(eq(villainHistories.id, historyId));
      await tx
        .update(villains)
        .set({ count: sql`${villains.count} - 1` })
        .where(eq(villains.id, villain.id));
    });

    revalidatePath('/');
    revalidatePath(`/history/${targetDate.toISOString().split('T')[0]}`);
    return { type: 'ok', data: undefined };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
};
