'use server';

import { db } from '@/db/client';
import { quests } from '@/db/schema/superbetter';
import { type SQL, inArray, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getUser } from '../../_actions/get-user';
import type { Result } from '../../_actions/types/result';

export const reorderQuests = async (
  newOrder: { id: string }[],
): Promise<Result<undefined, { type: 'unknown'; message: string }>> => {
  const user = getUser();
  if (newOrder.length === 0) {
    return { type: 'ok', data: undefined };
  }
  try {
    const chunks: SQL[] = [];
    const ids: string[] = [];

    chunks.push(sql`(case`);
    for (const [index, q] of Object.entries(newOrder)) {
      chunks.push(sql`when ${quests.id} = ${q.id} then ${index}`);
      ids.push(q.id);
    }
    chunks.push(sql`end)`);
    const finalSql: SQL = sql.join(chunks, sql.raw(' '));

    await db
      .update(quests)
      .set({ order: finalSql })
      .where(inArray(quests.id, ids));
    revalidatePath('/quests', 'page');
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      error: { type: 'unknown', message: 'unknown error' },
    };
  }
  return { type: 'ok', data: undefined };
};
