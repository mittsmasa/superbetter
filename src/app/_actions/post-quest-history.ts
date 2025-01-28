'use server';

import { getUser } from '@/app/_actions/get-user';
import type { Result } from '@/app/_actions/types/result';
import { updateMissionConditions } from '@/app/_utils/sql/mission';
import { db } from '@/db/client';
import { questHistories, quests } from '@/db/schema/superbetter';
import { and, eq, sql } from 'drizzle-orm';

export const postQuestHistory = async (
  questId: string,
): Promise<Result<{ id: string }, { type: 'unknown'; message: string }>> => {
  const user = await getUser();

  try {
    const historyId = await db.transaction(async (tx) => {
      const pup = await tx.query.quests.findFirst({
        where: (quest) => and(eq(quest.id, questId), eq(quest.userId, user.id)),
      });
      if (!pup) {
        tx.rollback();
        return;
      }
      const [{ id: historyId }] = await tx
        .insert(questHistories)
        .values({ questId: pup.id })
        .$returningId();
      await tx
        .update(quests)
        .set({ count: sql`${quests.count} + 1` })
        .where(eq(quests.id, pup.id));

      // update mission condition
      await updateMissionConditions({
        transaction: tx,
        userId: user.id,
        itemType: 'quest',
        itemId: questId,
      });
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
