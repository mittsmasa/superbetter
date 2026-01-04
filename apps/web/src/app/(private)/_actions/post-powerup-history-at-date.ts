'use server';

import { and, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createNoonDate } from '@/app/(private)/_actions/_utils/create-noon-date';
import { isEditableDate } from '@/app/(private)/_actions/_utils/editable-date';
import { createDailyMissionForDate } from '@/app/(private)/_actions/create-daily-mission-for-date';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { powerupHistories, powerups } from '@/db/schema/superbetter';
import { updateMissionConditions } from '@/utils/sql/mission';

export const postPowerupHistoryAtDate = async (
  powerupId: string,
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
    // その日付のデイリーミッションが存在しなければ作成
    await createDailyMissionForDate(targetDate);

    const noonDate = createNoonDate(targetDate);

    const historyId = await db.transaction(async (tx) => {
      const pup = await tx.query.powerups.findFirst({
        where: and(eq(powerups.id, powerupId), eq(powerups.userId, user.id)),
      });
      if (!pup) {
        tx.rollback();
        return;
      }

      const [{ id: historyId }] = await tx
        .insert(powerupHistories)
        .values({ powerupId: pup.id, createdAt: noonDate })
        .$returningId();

      await tx
        .update(powerups)
        .set({ count: sql`${powerups.count} + 1` })
        .where(eq(powerups.id, pup.id));

      await updateMissionConditions({
        transaction: tx,
        userId: user.id,
        itemType: 'powerup',
        itemId: powerupId,
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
