'use server';

import { and, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createNoonDate } from '@/app/(private)/_actions/_utils/create-noon-date';
import { isEditableDate } from '@/app/(private)/_actions/_utils/editable-date';
import { createDailyMissionForDate } from '@/app/(private)/_actions/create-daily-mission-for-date';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { questHistories, quests } from '@/db/schema/superbetter';
import { updateMissionConditions } from '@/utils/sql/mission';

export const postQuestHistoryAtDate = async (
  questId: string,
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
      const q = await tx.query.quests.findFirst({
        where: and(eq(quests.id, questId), eq(quests.userId, user.id)),
      });
      if (!q) {
        tx.rollback();
        return;
      }

      const [{ id: historyId }] = await tx
        .insert(questHistories)
        .values({ questId: q.id, createdAt: noonDate })
        .$returningId();

      await tx
        .update(quests)
        .set({ count: sql`${quests.count} + 1` })
        .where(eq(quests.id, q.id));

      await updateMissionConditions({
        transaction: tx,
        userId: user.id,
        itemType: 'quest',
        itemId: questId,
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
