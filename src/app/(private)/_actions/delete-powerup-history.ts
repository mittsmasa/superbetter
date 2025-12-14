'use server';

import { and, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { revertMissionConditionsIfNeeded } from '@/app/_utils/sql/mission';
import { isEditableDate } from '@/app/(private)/_actions/_utils/editable-date';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { powerupHistories, powerups } from '@/db/schema/superbetter';

export const deletePowerupHistory = async (
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
      const history = await tx.query.powerupHistories.findFirst({
        where: eq(powerupHistories.id, historyId),
      });
      if (!history) {
        tx.rollback();
        return;
      }

      const powerup = await tx.query.powerups.findFirst({
        where: and(
          eq(powerups.id, history.powerupId),
          eq(powerups.userId, user.id),
        ),
      });
      if (!powerup) {
        tx.rollback();
        return;
      }

      await tx
        .delete(powerupHistories)
        .where(eq(powerupHistories.id, historyId));
      await tx
        .update(powerups)
        .set({ count: sql`${powerups.count} - 1` })
        .where(eq(powerups.id, powerup.id));

      // デイリーミッションの条件を更新
      await revertMissionConditionsIfNeeded({
        transaction: tx,
        userId: user.id,
        itemType: 'powerup',
        itemId: powerup.id,
      });
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
