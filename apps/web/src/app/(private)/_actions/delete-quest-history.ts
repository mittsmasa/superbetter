'use server';

import { and, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { revertMissionConditionsIfNeeded } from '@/app/_utils/sql/mission';
import { isEditableDate } from '@/app/(private)/_actions/_utils/editable-date';
import { getUser } from '@/app/(private)/_actions/get-user';
import type { Result } from '@/app/(private)/_actions/types/result';
import { db } from '@/db/client';
import { questHistories, quests } from '@/db/schema/superbetter';

export const deleteQuestHistory = async (
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
      const history = await tx.query.questHistories.findFirst({
        where: eq(questHistories.id, historyId),
      });
      if (!history) {
        tx.rollback();
        return;
      }

      const quest = await tx.query.quests.findFirst({
        where: and(eq(quests.id, history.questId), eq(quests.userId, user.id)),
      });
      if (!quest) {
        tx.rollback();
        return;
      }

      await tx.delete(questHistories).where(eq(questHistories.id, historyId));
      await tx
        .update(quests)
        .set({ count: sql`${quests.count} - 1` })
        .where(eq(quests.id, quest.id));

      // デイリーミッションの条件を更新
      await revertMissionConditionsIfNeeded({
        transaction: tx,
        userId: user.id,
        itemType: 'quest',
        itemId: quest.id,
        historyCreatedAt: history.createdAt,
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
